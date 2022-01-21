import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div class="my-footer">
      <footer>
        <div>
          <h3>FIND US</h3>
          <address></address>
          <p>
            Eat Together
            <br />
            Copenhagen
            <br />
            M-Th:7am-4pm
            <br />
            fri-Sat:9am-8pm
          </p>
        </div>

        <div>
          <h3>About this page</h3>
          <p>
            This is a footer
            <br />
            of the page for
            <br />
            meal-sharing app
          </p>
        </div>

        <div>
          <h3>Archives</h3>
          <ul>
            <li>
              <a href="#">March 2016</a>
            </li>
            <li>
              <a href="#"> Feb 2016</a>
            </li>
            <li>
              <a href="#"> Jan 2016</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#history">History</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
