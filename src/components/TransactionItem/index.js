import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteHistory = () => {
    onDelete(transactionDetails)
  }

  return (
    <li className="list-item-container" key={id}>
      <p className="title">{title}</p>
      <p className="amount">Rs {amount}</p>
      <p className="type">{type}</p>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={onDeleteHistory}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
