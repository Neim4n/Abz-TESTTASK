import Users from "./Users";
import Form from "./Form";
import {useState} from "react";

function Main() {

    //States for users list
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false);

    //Function for fetch Users
    async function FetchUsers(page) {
        return await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
            .then(res => res.json())
            .then((data) => {
                if (data.page == data.total_pages) setIsLastPage(true);
                return data.users
            })
    }

    return (
        <main className="main">
            <div className="main__container">
                <section className="home">
                    <div className="home__container">
                        <h1 className="home__header main__header">Test assignment for front-end developer</h1>
                        <p className="home__text">
                            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
                            with a vast understanding of User design thinking as they'll be building web interfaces with
                            accessibility in mind. They should also be excited to learn, as the world of Front-End
                            Development keeps evolving.
                        </p>
                        <a href="#SignUp" className="home__button button">Sign up</a>
                    </div>
                </section>
                <Users users={users}
                       setUsers={setUsers}
                       FetchUsers={FetchUsers}
                       setPage={setPage}
                       page={page}
                       isLastPage={isLastPage}/>
                <Form setUsers={setUsers}
                      FetchUsers={FetchUsers}
                      setPage={setPage}/>
            </div>
        </main>
    )
}

export default Main;