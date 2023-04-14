import Card from "./Card";
import "./Card-style.css"

const CardRow = ({ items }) => {
    return (
      <div className="card-row">
        
          { items? items.map(item => (
            <Card  item={item} ></Card>
        )) : null}
      </div>
    );
  }
  
  export default CardRow;