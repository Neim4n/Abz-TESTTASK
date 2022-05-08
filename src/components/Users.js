import {useEffect, useState} from "react";
import photoCover from "./../images/photo-cover.svg"

//List of users
function Users({users, setUsers, FetchUsers, setPage, page, isLastPage}) {

    //Fetch first data
    useEffect(() => {
        FetchUsers(page).then((data) => setUsers(data)).then(() => setPage(page + 1))
    }, [])

    //Fetch other pages
    function showButtonHandler() {
        FetchUsers(page).then((data) => setUsers([...users, ...data])).then(() => setPage(page + 1));
    }

    return (
        <section className="users" id="Users">
            <div className="users__container">
                <h1 className="users__header main__header">
                    Working with GET request
                </h1>
                <div className="users__list">
                    {users && users.length ? users.map((user) => <User key={user.id} data={user}/>) : <></>}
                </div>
                <button className="user__button button" disabled={isLastPage} onClick={showButtonHandler}>
                    Show more
                </button>
            </div>
        </section>
    );
}

export default Users;

//Component for User card
function User({data}) {
    let {email, name, phone, photo, position} = data

    //onLoad && onError
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    function handleError() {
        setLoading(false);
        setIsError(true);
    }

    function handleLoad() {
        setLoading(false);
        setIsError(false);
    }

    return (
        <div className="user">
            <div className="user__container">
                <div className="user__photo-container">
                    {!isError && isLoading && <div className="loader"/>}
                    {isError && !isLoading && <img src={photoCover} className="user__photo" alt="coverPhoto"/>}
                    <img style={{display: isError || isLoading ? "none" : "initial"}}
                         src={photo} alt="" className="user__photo" onLoad={handleLoad} onError={handleError}/>
                </div>
                <span className="user__name" data-title={name}><span>{name}</span></span>
                <span className="user__position" data-title={position}><span>{position}</span></span>
                <span className="user__email" data-title={email}><span>{email}</span></span>
                <span className="user__phone" data-title={phone}><span>{phone}</span></span>
            </div>
        </div>
    )
}