import { useState } from 'react'

function Card(props) {
    const image = (<img src={props.img} />);
    return (
        <div
            className={"card " + props.difficulty}
            onClick={() => props.onClick(props.cardNumber)}
        >
            <p className="type">{props.flipped ? "Definition" : "Term"}</p>
            <p className="card-text">
                {props.flipped ? props.answer : props.name}
                {props.flipped ? image : null}
            </p>
            <div className="arrow-box">
                <div
                    className="arrow"
                    onClick={props.onClickPrev}
                >
                    {"<"}
                </div>
                <div
                    className="arrow"
                    onClick={props.onClickNext}
                >
                    {">"}
                </div>
            </div>
        </div>
    )

}

export default Card;