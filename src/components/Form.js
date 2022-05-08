import {createRef, useEffect, useState} from "react";
import successImage from "./../images/success-image.svg"

function Form({setUsers, FetchUsers, setPage}) {

    //States
    const [uploadedFile, setUploadedFile] = useState("");
    const [positions, setPositions] = useState([]);
    const [isActive, setIsActive] = useState(false)
    const [isSent, setIsSent] = useState(false);

    //Get positions
    useEffect(() => {
        fetchPositions().then(data => setPositions(data));
    }, [])

    async function fetchPositions() {
        return await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
            .then(res => res.json())
            .then((data) => data.positions);
    }

    //Upload photo
    function uploadPhotoHandler(event) {
        setUploadedFile(event.target.files[0].name)
    }

    //OnSubmit form
    function formSubmitHandler(e) {
        e.preventDefault();

        //CheckValidation
        let formElements = e.target.elements;
        if (!checkValidate(formElements)) return;

        //Format data
        let formData = new FormData();
        formData.append('position_id', formElements['position'].value);
        formData.append('name', formElements['name'].value);
        formData.append('email', formElements['email'].value);
        formData.append('phone', formElements['phone'].value);
        formData.append('photo', formElements['photo'].files[0])

        //Post Data function
        async function postData() {
            let token = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
                .then(res => res.json())
                .then(data => data.token);

            let options = {
                method: 'POST',
                body: formData,
                headers: {'Token': token},
            }
            //Post new user
            await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', options)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        FetchUsers(1).then((data) => setUsers(data)).then(() => setPage(2))
                        setIsSent(true)
                    }
                })
        }

        postData()
    }

    function checkValidate(formElements) {

        //Validate functions
        function validateEmail(email) {
            let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return re.test(String(email.value).toLowerCase()) || email.parentElement.classList.add("error")
        }

        function validateName(name) {
            return /^[A-Za-z ].{1,100}$/.test(name.value) || name.parentElement.classList.add("error")
        }

        function validatePhone(phone) {
            return /^[\+]{0,1}380([0-9]{9})/.test(phone.value) || phone.parentElement.classList.add("error")
        }

        //Check
        let emailCheck = validateEmail(formElements['email']);
        let nameCheck = validateName(formElements['name']);
        let phoneCheck = validatePhone(formElements['phone']);

        if (emailCheck && nameCheck && phoneCheck) {
            console.log("Validate!")
            return true;
        } else {
            console.log("NoValidate!")
            return false;
        }
    }

    function formInputHandler(event) {
        let value = event.target.value;
        let parentSpan = event.target.parentNode;
        parentSpan.classList.remove("error");

        if (value.length > 0) {
            parentSpan.classList.add("filled");
        } else if (value.length === 0) {
            parentSpan.classList.remove("filled");
        }

        //Activate button
        let formElements = event.target.closest("form").elements;
        isFillForm(formElements);
    }

    //Check full is form
    function isFillForm(formElements) {
        if (formElements['name'].value && formElements['position'].value && formElements['email'].value && formElements['phone'].value && formElements['photo'].files[0]) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    if (!isSent) {
        return (
            <section className="form" id="SignUp">
                <div className="form__container">
                    <h1 className="form__header main__header">
                        Working with POST request
                    </h1>
                    <form action="" className="form__form" onSubmit={formSubmitHandler}>
                        <span className="form__input-container name">
                        <input type="text" className="form__name-input" name="name" placeholder="Your name"
                               onInput={formInputHandler}/>
                    </span>
                        <span className="form__input-container email">
                        <input type="text" className="form__email-input" name="email" placeholder="Email"
                               onInput={formInputHandler}/>
                    </span>
                        <span className="form__input-container phone">
                        <input type="text" className="form__phone-input" name="phone" placeholder="Phone"
                               onInput={formInputHandler}/>
                    </span>
                        <div className="form__position-input">
                            <span className="position-input__header">Select your position</span>
                            {
                                positions ? positions.map(position => {
                                    return (
                                        <label htmlFor={`positionChoice${position.id}`}
                                               className="position-input__item"
                                               key={position.id}>
                                            <input type="radio"
                                                   id={`positionChoice${position.id}`} name="position"
                                                   value={position.id} onInput={formInputHandler} hidden/>
                                            <span>{position.name}</span>
                                        </label>
                                    )
                                }) : <></>
                            }
                        </div>
                        <label htmlFor="photo" className="form__upload-button">
                            <input type="file" id="photo" name="photo" hidden onChange={uploadPhotoHandler}
                                   onInput={formInputHandler} accept=".jpg, .jpeg"/>
                            <span className="upload-button__button">Upload</span>
                            <span
                                className={`upload-button__text ${uploadedFile ? "uploaded" : ""}`}>{uploadedFile || "Upload your photo"}</span>
                        </label>
                        <button className="form__button button" disabled={!isActive}>Sign up</button>
                    </form>
                </div>
            </section>
        )
    } else if (isSent) {
        return (
            <section className="form" id="SignUp">
                <div className="form__container">
                    <h1 className="form__header main__header">
                        User successfully registered
                    </h1>
                    <img src={successImage} alt="successImage" className="form__success-image"/>
                </div>
            </section>
        )
    }
}

export default Form;
