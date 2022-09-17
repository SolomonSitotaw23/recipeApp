<br />
<div align="center">
  <h3 align="center">FOOD RECIPE APP FOR MINAB TECH RECRUIT ASSIGNMENT</h3>

### Built With

* [![Vue][Vue.js]][Vue-url]


* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
*![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
*![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
*![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To set up this project Locally

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
 *nodemon
   ```sh
  npm install --global nodemon
  ```
  *yarn
  ```sh
  npm install --global yarn
  ```

### Installation




1. Clone the repo
   ```sh
   git clone https://github.com/solomonsitotaw23/recipeApp.git
   ```
2. Go to the backend folder and navgate to express
   ```sh
   npm install
   ```
3. and run the express server  `
   ```js
   node index.js 
   ```
   or simply
     ```js
   nodemon
   ```
4.  and run the docker and hasura inside the backend folder  `
   ```js
  docker compose up
   ```
   and
     ```js
 cd hasura && hasura metadata apply && hasura console
   ```
 now hasura console start running on port 9697
5.then go back to the recipe-app this is the front end part and run
     ```js
     yarn && yarn dev
   ```
6. then the app start running on port 5173


<!-- CONTACT -->
## Contact

Solomon Sitotaw-  solomonsitotaw9@gmail.com || solomonsitotaw23@gmail.com






[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
