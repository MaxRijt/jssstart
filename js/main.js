/**
 * This creates a vault object
 * @param code the code that you want to use, example: [1, 2, 3]
 * @param elem_id the id of the div that you want the vault in
 * @constructor idk what this is
 */
function Vault(code, elem_id) {

    let isSafe = false,
        correctCode = code,
        allButtons = $(".buttons>button"),
        enteredCode = [],
        countCorrect = 0,
        countWrong = 0;
    const player = new Audio();

    /**
     * This tests the code
     */
      this.testCode = function () {
        if(typeof code !== "object" || (code.length > 3 || code.length < 3) ) {
            alert("Code is not an array or has les then 3 numbers");
            isSafe = false;
        }
        else {
            isSafe = true;
        }
    };


    /**
     * This creates the vault
     * @returns {null}
     */
    this.init = function () {
        this.testCode();
        if(!isSafe) return null;
        _(elem_id).innerHTML += `
            <div class="vaultContainer">
              <h1 id="Main-Title">Vault</h1>
                <div id="${elem_id}-green-light" class="light green"></div>
                <div id="${elem_id}-red-light" class="light red"></div>
                <div class="clearfix"></div>

                <h3 id="${elem_id}-enteredCode" class="entered-code">${"-".repeat(code.length)}</h3>
                <div class="littleHack">
                    <p id="${elem_id}-notif" class="vault-notif">&nbsp;</p>
                    <div class="vault-buttons">
                        <button onclick="${elem_id}.buttonPress(this)" value="1">1</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="2">2</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="3">3</button>
                    </div>
                    <p id="${elem_id}-stats" class="vault-notif">Times correct: 0 &middot; Times incorrect: 0</p>
                </div>
            </div>
        `;
    };

    /**
     * this checks if the code is correct and what number you pressed
     * @param button the button that is being pressed
     * @returns {null}
     */
    this.buttonPress = function (button) {
        if(!isSafe) return null;
        for(let btn of allButtons) {
            btn.disabled = true;
        }
        let num = button.value;
        enteredCode.push(num);
        _(elem_id + "-enteredCode").innerHTML = (enteredCode.join("") + ("-".repeat(code.length)) ).substring(0, 3);
        if(enteredCode.length === 3) {
            isSafe = false;
            // noinspection EqualityComparisonWithCoercionJS
            let flag = enteredCode[0] == correctCode[1] && enteredCode[1] == correctCode[0] && enteredCode[2] == correctCode[0];
            if(flag) {
                player.pause();
                player.src = "audio/good.wav";
                player.play();
                blink("#" + elem_id + "-green-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is correct";
                countCorrect++;
            }
            else {player.pause();
                player.src = "audio/wrong.mp3";
                player.play();
                blink("#" + elem_id + "-red-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is incorrect";
                countWrong++;
            }
            _(elem_id + "-stats").innerHTML = `Times correct: ${countCorrect} &middot; Times incorrect: ${countWrong}`;
            setTimeout(() => {
                isSafe = true;
                _(elem_id + "-enteredCode").innerHTML = "-".repeat(code.length);
                _(elem_id + "-notif").innerHTML = "&nbsp;";
            }, 3600);
            enteredCode.splice(0, enteredCode.length);
        }


        for(let btn of allButtons) {
            btn.disabled = false;
        }
    };

}

/**
 * This is a shortcut for {@link Document Document}#getElementById
 * @param id the id of the element
 * @returns {HTMLElement | null} the element with the matching id
 * @private Soooo, this doc comment was auto generated and I have no idea what to put here lol
 */
function _(id) { return document.getElementById(id); }
