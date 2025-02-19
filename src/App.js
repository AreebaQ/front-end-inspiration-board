// import logo from './logo.svg';
import React from "react";
import axios from "axios";
import Board from "./components/Board";
import NewBoardForm from "./components/NewBoardForm";
import "./App.css";
import { useState, useEffect } from "react";
import CardList from "./components/CardList";

const CARDS = [
  {
    id: 1,
    message: "Card 1",
    likes: 1,
  },
  {
    id: 2,
    message: "Card 2",
    likes: 2,
  },
];

const App = () => {
  const [cards, setCards] = useState(CARDS);

  const onLike = (id) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          likes: (card.likes += 1),
        };
      }
      return card;
    });
    setCards(newCards);
  };

  const onDelete = (id) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
  };

  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, changeSelectedBoard] = useState("test");

  useEffect(() => {
    axios
      .get("http://localhost:5000/boards")
      .then((response) => {
        // setBoardData(response.data.message);
        console.log("handling the response!");
        console.log(response);
        const newBoards = response.data.map((board) => {
          return {
            board_id: board.id,
            title: board.title,
            owner: board.owner,
          };
        });
        setBoardData(newBoards);
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage(<section>{err.response.data.message}</section>);
      });
  }, []);

  const createNewBoard = (newBoard) => {
    axios
      .post("http://localhost:5000/boards", newBoard)
      .then((response) => {
        console.log("Response:", response.data);
        const newBoardList = [...boardData];
        newBoardList.push(response.data);
        setBoardData(newBoardList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getCards = (board_id) => {
  //   axios
  //     .get("http://localhost:5000/boards/<board_id>/cards")
  //     .then((response) => {
  //       // setBoardData(response.data.message);
  //       console.log("handling the card response!");
  //       console.log(response);
  //       const newCards = response.data.map((card) => {
  //         return {
  //           card_id: card.id,
  //           message: card.message,
  //           likes_count: card.likes,
  //         };
  //       });
  //       setBoardData(newBoards);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // setErrorMessage(<section>{err.response.data.message}</section>);
  //     });
  // };

  return (
    <div className="App">
      <header id="header">
        <h1>
          <span>INSPIRATION BOARD</span>
        </h1>
      </header>
      <main className="App-main">
        <div>
          <h2>My Board List</h2>
          {/* {errorMessage} */}
          {/* <div>{boardData}</div> */}
          <Board
            id="Boards"
            boardData={boardData}
            selectBoardCallBack={changeSelectedBoard}
          ></Board>
          <CardList
            id="Selected-boards"
            cards={cards}
            onLike={onLike}
            onDelete={onDelete}
          />
        </div>
        <div>
          <h2>Selected Board</h2>
          {selectedBoard}
        </div>
        <div>
          <h2>Create New Board</h2>
          <NewBoardForm
            id="New-board"
            addBoardCallback={createNewBoard}
          ></NewBoardForm>
        </div>
      </main>
    </div>
  );
};
/*
function App() {
  return (
    <div className="App">
      <main className="App-main">
        <header id="header">INSPIRATION BOARD</header>
        <div id="Boards">Boards</div>
        <div id="Selected-boards">Selected boards</div>
        <div id="New-board">New Boards</div>
        <div id="Cards">Cards For pick-Me-Up Quotes</div>
        <div id="Create-card">Create New Card</div>
      </main>
    </div>
  );
}
*/
export default App;

//---------------------------------------------
//App is the only piece talking to backend: state is centered in app

//make notes about what should happen in App
//state variables:
//current board?
//data of this board? cards carry board_id
//form visible?

//some event handler to update state whenever the board form is filled out: new board
//some event handler to update state whenever the card form is filled out: new card
//some event handler to handle likes? maybe the database would just need to be called?
//event handler for handling deletion of a card

//pass down all of the handlers
//lift state from components

/*
function App() {

//Dummy Data
  const [boardData, setBoardData] = useState([
    {
      title: 'board 1',
      owner: 'Ada',
      //maybe a boolean for isVisible
    },
    {
      title: 'board 2',
      owner: 'Ada 2',
      //maybe a boolean for isVisible
    },
    {
      title: 'board 3',
      owner: 'Ada 3',
      //maybe a boolean for isVisible
    },
]);

//Dummy data
const [cardData, setCardData] = useState([
  {
    message: 'message 1',
    likes: '1',
    //maybe a boolean for isVisible
  },
  {
    message: 'message 2',
    likes: '2',
    //maybe a boolean for isVisible
  },
  {
    message: 'message 3',
    likes: '3',
    //maybe a boolean for isVisible
  },
]);

  const addBoardData = newBoard => {
    // Duplicate the board list
    const newBoardList = [...boardData];

    // Logic to generate the next valid student ID
    //const nextId = Math.max(...newBoardList.map(board => board.id)) + 1;

    newBoardList.push({
        //id: nextId,
        title: newBoard.title,
        owner: newBoard.owner,
        //isPresentData: false,
    });

    setBoardData(newBoardList);
};

const addCardData = newStudent => {

};
  return(

    //outside of this return, we make an axios call 
    //store that data that comes back into a list of boards
    //map to loop through that list of boards
    //send board component 1 board at a time to render 
    //board component is going to display the names of each board above its call to card list

    <div>
            <ul>
                <li className={nameColor}>Nickname: {props.name}</li>
                <li>Email: {props.email}</li>
            </ul>
            <button onClick={onAttendanceButtonClick}>Toggle if {props.name} is present</button>
        </div>



    <main>
      <h1>Attendance</h1>
        <
          students={studentData}
          onUpdateStudent={updateStudentData}
        ></StudentList>
    
        <NewStudentForm
          addStudentCallback={addStudentData}
        ></NewStudentForm>
    </main>
  );
}

export default App;



//-------------------------------------
//original return inside of App:
// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );
*/

//--------------------------------------
// const [boardData, setBoardData] = useState([
//   {
//     title: "board 1",
//     owner: "Ada",
//     //maybe a boolean for isVisible
//   },
//   {
//     title: "board 2",
//     owner: "Ada 2",
//     //maybe a boolean for isVisible
//   },
//   {
//     title: "board 3",
//     owner: "Ada 3",
//     //maybe a boolean for isVisible
//   },
// ]);

// const addBoardData = (newBoard) => {
//   // Duplicate the board list
//   const newBoardList = [...boardData];

//   // Logic to generate the next valid student ID
//   // const nextId = Math.max(...newBoardList.map((board) => board.id)) + 1;

//   newBoardList.push({
//     // id: nextId,
//     title: newBoard.title,
//     owner: newBoard.owner,
//     //isPresentData: false,
//   });
//   console.log(newBoardList);
//   setBoardData(newBoardList);
// };

//---------------------------------------

// const [boardData, setBoardData] = useState([]);
// const [errorMessage, setErrorMessage] = useState("");
// console.log(boardData);
