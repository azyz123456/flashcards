import { useState } from 'react'

function Card(props) {
    const image = (<img className="card-img" src={props.img} />);
    return (
        <div className="scene">
            <div
                className={"card " + props.flipped}
                onClick={() => props.onClick(props.cardNumber)}
            >

                <div
                    className="card__face card__face--front"  
                >
                    <p className="type">Term</p>
                    <p className="card-text">
                        {props.name}
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

                <div
                    className="card__face card__face--back"
                >
                    <p className="type">Definition</p>
                    <p className="card-text">
                        {props.answer}
                        {image}
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
            </div>
        </div>
    )

}

export default Card;