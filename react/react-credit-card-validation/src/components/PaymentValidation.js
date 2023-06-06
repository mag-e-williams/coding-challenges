import React, { useState, useEffect } from "react";
import "./PaymentValidation.css";

export function PaymentValidation() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardholderNameError, setCardholderNameError] = useState("");
  const [month, setMonth] = useState("");
  const [monthError, setMonthError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [formValid, setFormValid] = useState(false); 

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const cardNumberError = "Invalid Card Number";
    if (!cardNumber) {
      setCardNumberError(cardNumberError);
    } else if (cardNumber.length !== 16) {
      setCardNumberError(cardNumberError);
    } else {
      setCardNumberError("");
    }
  }, [cardNumber]);

  useEffect(() => {
    const cardNameError = "Invalid Card Name";
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!cardholderName) {
      setCardholderNameError(cardNameError);
    } else if (!nameRegex.test(cardholderName)) {
      setCardholderNameError(cardNameError);
    } else {
      setCardholderNameError("");
    }
  }, [cardholderName]);

  useEffect(() => {
    const monthError = "Invalid Month";
    if (!month) {
      setMonthError(monthError);
    } else if (month.length !== 2 || isNaN(month)) {
      setMonthError(monthError);
    } else if (parseInt(month) < 1 || parseInt(month) > 12) {
      setMonthError(monthError);
    } else {
      setMonthError("");
    }
  }, [month]);

  useEffect(() => {
    const yearError = "Invalid Year";
    if (!year) {
      setYearError(yearError);
    } else if (year.length !== 4 || isNaN(year)) {
      setYearError(yearError);
    } else if (parseInt(year) < currentYear || parseInt(year) > currentYear + 3) {
      setYearError(yearError);
    } else {
      setYearError("");
    }
  }, [year, currentYear]);


  useEffect(() => {
    const cvvError = "Invalid CVV";
    if (!cvv) {
      setCvvError(cvvError);
    } else if (cvv.length !== 3 || isNaN(cvv)) {
      setCvvError(cvvError);
    } else {
      setCvvError("");
    }
  }, [cvv]);

  useEffect(() => {
    // Check if any of the error states are not empty
    const isFormValid = !cardNumberError && !cardholderNameError && !monthError && !yearError && !cvvError;
    setFormValid(isFormValid);
  }, [cardNumberError, cardholderNameError, monthError, yearError, cvvError]);

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">XXXXXXXXXXXXXXXX</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">HOLDER NAME</span>
              <span className="debit-card-date">MM/YYYY</span>
              <span className="debit-card-cvv">CVV</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  required
                  value={cardNumber}
                  type="text" 
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                {cardNumberError && (
                  <p className="invalid-text" data-testid="numberInputError">
                    {cardNumberError}
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  required
                  value={cardholderName}
                  type="text" 
                  onChange={(e) => setCardholderName(e.target.value)}
                />
                {cardholderNameError && (
                  <p className="invalid-text" data-testid="nameInputError">
                    {cardholderNameError}
                  </p>
                )}
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    required
                    value={month}
                    type="number" 
                    onChange={(e) => setMonth(e.target.value)}
                  />
                  {monthError && (
                    <p className="invalid-text" data-testid="monthInputError">
                      {monthError}
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    required
                    value={year}
                    type="number" 
                    onChange={(e) => setYear(e.target.value)}
                  />
                  {yearError && (
                    <p className="invalid-text" data-testid="yearInputError">
                      {yearError}
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input 
                    placeholder="CVV" 
                    data-testid="cvvInput" 
                    required
                    value={cvv}
                    type="number" 
                    onChange={(e) => setCvv(e.target.value)}
                  />
                  {cvvError && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      {cvvError}
                    </p>
                  )}    
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={!formValid} 
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
