window.addEventListener('load', function(){
    // prep required doms
    var crossword = document.getElementById("crossword")
    var questions = document.getElementById("questions")

    // prep function to make one default textbox
    function createTextBox() {
        var textbox = document.createElement("input")
        textbox.setAttribute("type", "text")
        textbox.setAttribute("class", "textbox")
        textbox.setAttribute("maxlength", "1")
        return textbox
    }

    // input all question details here
    var qDetails = {
        1: {
            position: { row: 0, col: 5 },
            question: "When declaring a function, you can include ___ to make the function to expect some values when being called.",
            answer: "parameters", direction: "across"
        },
        5: {
            position: { row: 5, col: 0 },
            question: "Using ___ will make your code more reusable.",
            answer: "functions", direction: "across"
        },
        9: {
            position: { row: 7, col: 14 },
            question: "A group of the same things.",
            answer: "array", direction: "across"
        },
        10: {
            position: { row: 8, col: 2 },
            question: "typeof array.",
            answer: "object", direction: "across"
        },
        11: {
            position: { row: 10, col: 5 },
            question: "One of the differences between String and Array.",
            answer: "immutability", direction: "across"
        },
        2: {
            position: { row: 0, col: 7 },
            question: "The result after calling a function.",
            answer: "return", direction: "down"
        },
        3: {
            position: { row: 0, col: 12 },
            question: "return statement will ___ the execution of a function.",
            answer: "end", direction: "down"
        },
        4: {
            position: { row: 3, col: 17 },
            question: "Best practice when naming an Array.",
            answer: "plural", direction: "down"
        },
        6: {
            position: { row: 5, col: 5 },
            question: "Just as with String, you can do ___ on Array.",
            answer: "indexing", direction: "down"
        },
        7: {
            position: { row: 6, col: 9 },
            question: "Use ___ to detect whether an Array is empty or not.",
            answer: "length", direction: "down"
        },
        8: {
            position: { row: 6, col: 15 },
            question: "Banana, Orange, Grapes, Apple, Kiwi.",
            answer: "fruits", direction: "down"
        },
    }
    populateQuestions(qDetails)
    drawCrossword(qDetails)
    
    // clear the crossword inputs
    document.getElementById("clearButton").onclick=function() {
        let textboxes = document.getElementsByClassName("textbox")
        for (box of textboxes) {
            box.value = ""
        }
        window.scrollTo(0,0)
    }

    // draw the crossword
    function drawCrossword(qDetails) {
        //first, find the size of the crossword
        //create a multi-array marking empty "key" and disabled "" boxes
        let board = createBoard(qDetails)
        // draw board in html with textboxes
        for (row of board) {
            let rowDiv = document.createElement("div")
            rowDiv.style.margin = 0
            for (col of row) {
                let box = createTextBox()
                if (!col) {
                    box.disabled = true
                    box.setAttribute("class", "textbox disabled")
                } else if (col != " ") {
                    let sup = document.createElement("sup")
                    sup.innerText = col
                    sup.style.position = "absolute"
                    sup.requestFullscreen.siz
                    rowDiv.append(sup)
                }
                rowDiv.append(box)
            }
            crossword.append(rowDiv)
        }
    }

    function createBoard(qDetails) {
        let arr = []
        let qList = Object.keys(qDetails)
        let maxRow = 0
        let maxCol = 0;
        for (key of qList) {
            let { row, col } = qDetails[key].position
            let len = qDetails[key].answer.length
            let dir = qDetails[key].direction // across - inc col, down - inc row

            if (!arr[row]) arr[row] = []
            arr[row][col] = key

            if (dir === "down") {
                for (let i = row + 1; i < row + len; i++) {
                    if (!arr[i]) arr[i] = []
                    arr[i][col] = " "
                }
                if (row + len > maxRow) maxRow = row + len
            } else if (dir === "across") {
                for (let i = col + 1; i < col + len; i++) {
                    arr[row][i] = " "
                }
                if (col + len > maxCol) maxCol = col + len
            }
        }
        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                if (!arr[i][j]) arr[i][j] = ""
            }
        }
        return arr
    }

    // write all the questions to HTML
    function populateQuestions(qDetails) {
        var qList = Object.keys(qDetails) // [1, 5, 9, 10, 11, 2, 3, 4, 5, 7, 8]

        var across = document.createElement("div")
        questions.append(createH(3, "Across"))
        questions.append(across)

        var down = document.createElement("div")
        questions.append(createH(3, "Down"))
        questions.append(down)

        for (key of qList) {
            // for each question, make new <p>
            // format: key qDetails[key].question
            let q = createP(`${key}: ${qDetails[key].question}`)

            // put in either across or down area in DOM questions
            if (qDetails[key].direction === "across") {
                across.append(q)
            } else if (qDetails[key].direction === "down") {
                down.append(q)
            } else {
                q = createP(`${key}: ${qDetails[key].question} (direction: ${qDetails[key].direction})`)
                questions.append(q)
            }
        }
    }

    function createP(text) {
        var p = document.createElement("p")
        p.innerText = text
        return p
    }
    function createH(num, text) {
        var h = document.createElement("h" + num)
        h.innerText = text
        return h
    }
})
