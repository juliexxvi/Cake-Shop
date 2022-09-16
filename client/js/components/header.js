import { renderMenuList } from "./menu.js";
import { renderOurStory } from "./our-story.js";
import { renderCartList } from "./cart.js";
import { renderLogin } from "./login.js";
import { renderAllOrders } from "./orders.js";
import { renderNewItem } from "./new-item.js";
import { renderHome } from "./home.js";

const htmlForCustomer = `
<div class="hero_area">
<header class="header_section">
  <div class="container">
    <nav class="navbar navbar-expand-lg custom_nav-container ">
      <a class="navbar-brand" href="index.html">
        <span>
          Jula Bakery
        </span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class=""> </span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li id="header-home" class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li id="header-products" class="nav-item">
            <a class="nav-link" href="#">Products</a>
          </li>
          <li id="header-login" class="nav-item">
            <a class="nav-link" href="#">Log In</a>
          </li>
          <li id="header-cart" class="nav-item">
            <a class="nav-link" href="#">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029"
                style="enable-background:new 0 0 456.029 456.029;" xml:space="preserve">
                <g>
                  <g>
                    <path
                      d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                                  c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                                  C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                                  c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                                  C457.728,97.71,450.56,86.958,439.296,84.91z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                                  c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>
</div>
`;

const htmlForSeller = `
<div class="hero_area">
<header class="header_section">
  <div class="container">
    <nav class="navbar navbar-expand-lg custom_nav-container ">
      <a class="navbar-brand" href="index.html">
        <span>
          Jula Bakery
        </span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class=""> </span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li id="header-home" class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li id="header-products" class="nav-item">
            <a class="nav-link" href="#">Products</a>
          </li>
          <li id="header-orders" class="nav-item">
            <a class="nav-link" href="#">Orders</a>
          </li>
          <li id="header-add-product" class="nav-item">
            <a class="nav-link" href="#">Add Product</a>
          </li>
          <li id="header-logout" class="nav-item">
            <a class="nav-link" href="#">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>
</div>
`;

export const renderHeader = () => {
  const header = document.querySelector("#header-nav");
  axios.get("/api/session").then((response) => {
    const loggedInEmail = response.data.email;
    header.innerHTML = loggedInEmail ? htmlForSeller : htmlForCustomer;

    const homeLi = document.getElementById("header-home");
    homeLi.addEventListener("click", renderHome);

    const productsLi = document.getElementById("header-products");
    productsLi.addEventListener("click", renderMenuList);

    if (!loggedInEmail) {
      const loginLi = document.getElementById("header-login");
      loginLi.addEventListener("click", renderLogin);

      const cartLi = document.getElementById("header-cart");
      cartLi.addEventListener("click", renderCartList);
    }

    if (loggedInEmail) {
      const logOutLi = document.getElementById("header-logout");
      logOutLi.addEventListener("click", () => {
        axios.delete("/api/session").then(() => {
          window.location.href = "";
        });
      });

      const ordersLi = document.getElementById("header-orders");
      ordersLi.addEventListener("click", renderAllOrders);

      const addProductLi = document.getElementById("header-add-product");
      addProductLi.addEventListener("click", renderNewItem);
    }
  });
};
