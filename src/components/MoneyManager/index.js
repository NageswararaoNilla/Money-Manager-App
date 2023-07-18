import {Component} from 'react'

import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
// const initialList = [
//   {
//     id: v4(),
//     title: 'Salary',
//     amount: 50000,
//     type: 'Income',
//   },
// ]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    type: 'INCOME',
    income: 0,
    expenses: 0,
  }

  capitalizeString = str => str.charAt(0) + str.slice(1).toLowerCase()

  onUpdateBalance = event => {
    event.preventDefault()
    const {titleInput, amountInput, type} = this.state

    const newHistory = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: this.capitalizeString(type),
    }

    console.log(type)
    if (type === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amountInput),
      }))
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newHistory],
      titleInput: '',
      amountInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeAmount = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  onChangeType = event => {
    this.setState({
      type: event.target.value,
    })
  }

  onDelete = transactionDetails => {
    const {transactionsList} = this.state
    const filterList = transactionsList.filter(
      each => each.id !== transactionDetails.id,
    )
    this.setState({
      transactionsList: filterList,
    })
    if (transactionDetails.type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(transactionDetails.amount),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(transactionDetails.amount),
      }))
    }
  }

  render() {
    const {
      transactionsList,
      titleInput,
      amountInput,
      type,
      income,
      expenses,
    } = this.state
    const balance = income - expenses
    return (
      <div className="app-container">
        <div className="money-manager-container">
          <div className="header-container">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <div className="balance-managing-container">
            <div className="balance-amount-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                className="img"
                alt="balance"
              />
              <div>
                <p>Your Balance</p>
                <p data-testid="balanceAmount">Rs {balance}</p>
              </div>
            </div>
            <div className="income-amount-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                className="img"
                alt="income"
              />
              <div>
                <p>Your Income</p>
                <p data-testid="incomeAmount">Rs {income}</p>
              </div>
            </div>
            <div className="expenses-amount-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                className="img"
                alt="expenses"
              />
              <div>
                <p>Your Expenses</p>
                <p data-testid="expensesAmount">Rs {expenses}</p>
              </div>
            </div>
          </div>
          <div className="form-with-transactions">
            <div className="form-container">
              <form className="form" onSubmit={this.onUpdateBalance}>
                <h1>Add Transaction</h1>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                />
                <br />
                <label htmlFor="amount">AMOUNT</label>
                <input
                  type="text"
                  id="amount"
                  onChange={this.onChangeAmount}
                  value={amountInput}
                  placeholder="Amount"
                />
                <label htmlFor="type">TYPE</label>
                <select
                  id="type"
                  className="options"
                  onChange={this.onChangeType}
                  defaultValue={type}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option value={eachOption.optionId}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="history-container">
              <h1>History</h1>
              <div className="statement-container">
                <div className="headings-container">
                  <p className="title-css">Title</p>
                  <p className="amount-css">Amount</p>
                  <p className="type-css">Type</p>
                </div>
                <ul className="list-container">
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      transactionDetails={eachTransaction}
                      onDelete={this.onDelete}
                      key={eachTransaction.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
