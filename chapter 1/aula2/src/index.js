const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

/*
cpf - string
name - string
id - uuid - yarn add uuid
statement - []
*/

//Middleware
//next ele vai definir se o middleware vai pra frente ou parar, funciona como um guardinha
function verifyIfExistsAccountCPF(req, res, next) {
    const { cpf } = req.headers;
    const customer = customers.find(customer => customer.cpf === cpf);
    if (!customer) {
        return res.status(400).json({error: "Customer not found!"});
    }
    
    req.customer = customer;

    return next();
}


//o acc no reduce serve como um acumulador, ele vai acumulando os valores
//o acc é o valor inicial, no caso 0 que devemos colocar no final como valor inicial!
function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }
    , 0);
}



app.post ('/account', (req, res) => {
    const { cpf, name } = req.body;
    const id = uuidv4();

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
        return res.status(400).json({error: "Customer already exists!"});
    }

    customers.push({
        cpf,
        name,
        id,
        statement: []
    });
    
    return res.status(201).send();
});

//app.use(verifyIfExistsAccountCPF);

app.get('/statement/:cpf', verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    return res.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
    const { description, amount } = req.body;
    const { customer } = req;
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };
    customer.statement.push(statementOperation);
    return res.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (req, res) => {
    const { amount } = req.body;
    const { customer } = req;
    const balance = getBalance(customer.statement);
    if (balance < amount) {
        return res.status(400).json({error: "Insufficient funds!"});
    }
    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    };
    customer.statement.push(statementOperation);
    return res.status(201).send();
});

//adicionar 00:00 no final da data para que ele entenda que é possivel pegar o dia inteiro
app.get('/statement/date', verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    const { date } = req.query;
    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(
        (statement) =>
        statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    );

    return res.json(statement);
});


app.put('/account', verifyIfExistsAccountCPF, (req, res) => {
    const { name } = req.body;
    const { customer } = req;
    customer.name = name;
    return res.status(201).send();
});

app.get('/account', verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    return res.json(customer);
});

app.delete('/account', verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    //splice
    customers.splice(customer, 1);
    return res.status(200).json(customers);
});

app.get('/balance', verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    const balance = getBalance(customer.statement);
    return res.json(balance);
});

app.listen(3000);