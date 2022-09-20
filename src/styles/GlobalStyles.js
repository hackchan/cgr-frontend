import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
        @import url('https://fonts.googleapis.com/css2?family=Coming+Soon&family=Inter&family=Open+Sans&family=Roboto&display=swap');
        html {
                box-sizing: border-box;
               
                
        }
        
        *, *::before, *::after {
                box-sizing: inherit;
                margin:0;
                padding: 0;
        }
        
        ul, li, h1, h2, h3, p, button {
                margin: 0;
        }

        ul {
                list-style: none;
        }

        button {
                background: transparent;
                border: 0;
                outline: 0;
        }
        * {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: #f2f2f2;
}

*::-webkit-scrollbar-thumb {
  background-color: #1B1B25;
  border-radius: 10px;
  border: 1px solid #3c484e;
}
        .avatar {
         width:70px;
         height: 70px;
         position: absolute;
         /* top:-9%;
         left: calc(50% - 50px); */
         top: 5px;
         left: 50%;
         transform: translate(-50%, -50%);
         object-fit: cover;
        }
        body {
         /* font-family: 'Coming Soon', cursive; */
         font-family: 'Inter', sans-serif;
         margin: 0;
         padding: 0;
         color: #3c484e;
         background-image:url('https://i.ibb.co/z7qw0Gx/portada.jpg');background-position: center center;
         background-attachment: fixed;
         background-size:cover;
         background-repeat:no-repeat;
         /* display: flex;
         min-height: 100vh;
         flex-direction: column;
         max-width: 1600px;
         margin: 0 auto; */
        }
        

        .Main {
          grid-template-columns: minmax(auto, 1fr);
          display: grid;
          justify-content: center;
          align-items: center;

          
        }

         .box{
           background-color: rgba(0, 0, 0, 0.8);
           color: #fff;
           max-width: 600px;
           padding: 50px 30px;
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           border-radius: 10px;
         }
         .box h2{
                text-align: center;
                margin-bottom: 15px;
         }
           
        @media  (max-width: 768px) {
                .box{
                  width: 100%;
                }
                
               
        }

        .btnizq{
                display: flex;
                justify-content: flex-start;
        }

        .btnder{
                display: flex;
                justify-content: flex-end;
        }

        .btncenter{
                display: flex;
                justify-content: center;
        }
        
        //errors

        .errors {
        display:flex;
        justify-content:flex-start;
        align-items: center;
        color:hotpink;
        padding:2px 0;
        border-radius:5px;
        font-size: 14px;
        cursor: pointer;
        position: relative;
}
    .errors::before {
        transition: .3s;
        font-size: 18px;
        content: '🚀';
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .errors:hover::before{
        
        transform : rotate(-45deg) scale(1.2);
    }
    .errors.alert{
        background: orange;
    }
    .link {
        color:white;
        text-decoration:none;
    }
    .ok {
        display:flex;
        justify-content:center;
        background: rgba(2,2,2,.3);
        color:white;
        padding:5px;
        border-radius:5px;
        font-size: 18px;
        border: 2px solid #94c53c;
    }

    .starts {
        width: 100%;
        padding: 2rem 0;
        background: url('https://i.ibb.co/BCFFs89/pattern.jpg'), #1B1B25;
        background-repeat: repeat;
        margin-bottom: 1rem;
        color: #ffffff;
}

/* .tableContainer{
        max-height: 75vh;
}
  @media  (max-width: 1700px) {

        .tableContainer{
        max-height: 70vh;
}
  } */


/* .tableHeader{
        position: sticky;
        top: 0;
        z-index: 1;
}
*/
.tableHeaderCell{
       color: #89b637 !important;
       background: #1B1B25 !important;
      
} 

.btn{
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    border: 0px solid;
    border-bottom: 2px solid;
    border-color: #ec9228;
    padding: 10px 41px;
    border-radius: 5px;
    background: none;
    text-transform: uppercase;
    display: inline-block;
    margin: 10px 20px 10px 0;
    background-color: #ffad32;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    text-decoration: none;
    cursor: pointer;
}
.btn:hover{
    background: #ec9228;
    color: #ffffff;
    text-decoration: none;
}
.btn-brown{
    border-color: #ec5900;
    background-color: #ff7000;
}
.btn-brown:hover{
    background: #ec5900;
}

 .resizer {
      display: inline-block;
      /* background: blue; */
      width: 10px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      /* prevent scroll on touch devices */
      touch-action: none;
    }

    .isResizing {
      background: red;
    }
        
.navbar-nav .active {
  color: red !important;
}

.special_modal .modal-content {
  background-color: #000;
  color: #fff;
}
        /* body {
                background: #fefefe;
                height: 100vh;
                margin: 0 auto;
                max-width: 500px;
                overscroll-behavior: none;
                width: 100%;
        } */

         /* #app {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                overflow-x: hidden;
                min-height: 100vh;
                padding-bottom: 10px;
        } */
`
