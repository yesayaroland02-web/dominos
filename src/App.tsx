import { useState } from "react";
import type { ChangeEvent } from "react";

import {
  sort,
  countDoubleNumber,
  removeDuplicate,
  flipDominoes,
  removeByTotal,
} from "./utils";

import type { Domino, SortOrder } from "./utils";
import "./App.css";

const DEFAULT_DOMINOES: Domino[] = [
  [1, 2],
  [1, 1],
  [4, 1],
  [3, 3],
  [6, 1],
  [5, 1],
  [3, 2],
  [2, 3],
  [3, 1],
  [5, 1],
];

const PIP_POSITIONS: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

interface DominoSideProps {
  number: number;
}

interface DominoCardProps {
  domino: Domino;
  index: number;
}

function DominoSide({ number }: DominoSideProps) {
  return (
    <div className="domino-side">
      {Array.from({ length: 9 }, (_, index) => {
        const position = index + 1;
        const active = PIP_POSITIONS[number]?.includes(position);

        return (
          <span
            key={position}
            className={`pip ${active ? "active" : ""}`}
          />
        );
      })}
    </div>
  );
}

function DominoCard({ domino, index }: DominoCardProps) {
  return (
    <div className="domino-card">
      <span className="card-number">
        #{String(index + 1).padStart(2, "0")}
      </span>

      <DominoSide number={domino[0]} />

      <div className="domino-divider" />

      <DominoSide number={domino[1]} />

      <span className="card-total">
        Total: {domino[0] + domino[1]}
      </span>
    </div>
  );
}

export default function App() {
  const [dominoes, setDominoes] = useState<Domino[]>(
    DEFAULT_DOMINOES.map(([a, b]) => [a, b])
  );

  const [sortOrder, setSortOrder] = useState<
    "default" | SortOrder
  >("default");

  const [removeTotal, setRemoveTotal] = useState<string>("");

  const doubleCount = countDoubleNumber(dominoes);

  const totalValue = dominoes.reduce(
    (sum, item) => sum + item[0] + item[1],
    0
  );

  const handleSort = (order: SortOrder) => {
    setDominoes((current) => sort(current, order));
    setSortOrder(order);
  };

  const handleRemoveDuplicate = () => {
    setDominoes((current) => removeDuplicate(current));
    setSortOrder("default");
  };

  const handleFlip = () => {
    setDominoes((current) => flipDominoes(current));
    setSortOrder("default");
  };

  const handleRemoveTotal = () => {
    if (removeTotal.trim() === "") {
      alert("Please enter a total number.");
      return;
    }

    const total = Number(removeTotal);

    if (!Number.isInteger(total) || total < 0 || total > 12) {
      alert("Please enter a number between 0 and 12.");
      return;
    }

    setDominoes((current) => removeByTotal(current, total));
    setRemoveTotal("");
    setSortOrder("default");
  };

  const handleReset = () => {
    setDominoes(DEFAULT_DOMINOES.map(([a, b]) => [a, b]));
    setRemoveTotal("");
    setSortOrder("default");
  };

  const handleTotalChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setRemoveTotal(event.target.value);
  };

  return (
    <main className="app-container">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">D</div>
          <span>
            DOMINO<span className="brand-highlight">LAB</span>
          </span>
        </div>

        <span className="header-label">SELECTION TEST</span>
      </header>

      <section className="hero">
        <div className="hero-tag">
          <span className="status-dot" />
          REACT APPLICATION
        </div>

        <h1>
          Dominoes <span>Manager.</span>
        </h1>

        <p>
          Manage, organize, and manipulate your domino collection
          with simple interactive tools.
        </p>
      </section>

      <section className="statistics">
        <div className="stat-card">
          <div className="stat-icon">▦</div>
          <div>
            <span className="stat-label">TOTAL CARDS</span>
            <h2>{dominoes.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon double-icon">Ⅱ</div>
          <div>
            <span className="stat-label">DOUBLE NUMBERS</span>
            <h2>{doubleCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">Σ</div>
          <div>
            <span className="stat-label">TOTAL VALUE</span>
            <h2>{totalValue}</h2>
          </div>
        </div>
      </section>

      <section className="workspace">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CONTROL PANEL</span>
            <h2>Manage Dominoes</h2>
            <p>Choose an operation to manipulate your cards.</p>
          </div>

          <button className="reset-button" onClick={handleReset}>
            ↺ Reset Data
          </button>
        </div>

        <div className="controls">
          <div className="control-group">
            <span className="control-title">SORT CARDS</span>

            <div className="button-group">
              <button
                className={`action-button ${
                  sortOrder === "asc" ? "selected" : ""
                }`}
                onClick={() => handleSort("asc")}
              >
                ↑ Ascending
              </button>

              <button
                className={`action-button ${
                  sortOrder === "desc" ? "selected" : ""
                }`}
                onClick={() => handleSort("desc")}
              >
                ↓ Descending
              </button>
            </div>
          </div>

          <div className="control-group">
            <span className="control-title">CARD OPERATIONS</span>

            <div className="button-group">
              <button
                className="action-button"
                onClick={handleRemoveDuplicate}
              >
                ◈ Remove Duplicate
              </button>

              <button
                className="action-button"
                onClick={handleFlip}
              >
                ⇄ Flip Cards
              </button>
            </div>
          </div>

          <div className="control-group">
            <span className="control-title">REMOVE BY TOTAL</span>

            <div className="remove-form">
              <input
                type="number"
                min="0"
                max="12"
                placeholder="Enter total (0-12)"
                value={removeTotal}
                onChange={handleTotalChange}
              />

              <button
                className="remove-button"
                onClick={handleRemoveTotal}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="cards-section">
        <div className="cards-heading">
          <div>
            <span className="eyebrow">COLLECTION</span>
            <h2>Domino Cards</h2>
          </div>

          <span className="card-count">
            {dominoes.length} CARDS
          </span>
        </div>

        {dominoes.length > 0 ? (
          <div className="domino-grid">
            {dominoes.map((domino, index) => (
              <DominoCard
                key={`${domino[0]}-${domino[1]}-${index}`}
                domino={domino}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">▦</div>
            <h3>No Domino Cards</h3>
            <p>Your collection is currently empty.</p>

            <button onClick={handleReset}>
              Restore Default Data
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>DOMINOLAB © 2026</span>
        <span>BUILT WITH REACT + TYPESCRIPT</span>
      </footer>
    </main>
  );
}
