import React, { useState } from "react";
import Select from "react-select";

const DeckSelector = ({ decks, setMyDeck, setYourDeck }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <DeckDropdown decks={decks} name={"내 덱"} onSelect={setMyDeck} />
            <DeckDropdown
                decks={decks}
                name={"상대 덱"}
                onSelect={setYourDeck}
            />
        </div>
    );
};

const DeckDropdown = ({ decks, name, onSelect }) => (
    <div style={{ width: 230 }}>
        {name}
        <Select
            options={decks}
            onChange={(newValue) => onSelect(newValue)}
            placeholder="덱 검색"
        />
    </div>
);

export default DeckSelector;
