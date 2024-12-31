import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST || "";

function Text({ name, type }) {
    const id = name.toLowerCase();
    return <div className="flex flex-col">
        <label for={id}>{name}: </label>
        <input id={id} type={type} className="rounded-sm text-lg p-1 px-2" placeholder={`enter ${id}...`} />
    </div>
}

function Submit({ text }) {
    return <input type="submit" className="bg-blue-400 text-xl py-2 rounded-md" value={text} />
}

function SignIn() {
    const navigate = useNavigate();

    function signIn(ev) {
        ev.preventDefault();
        const body = {
            username: ev.target.username.value,
            password: ev.target.password.value,
        };

        // TODO: error checking and all
        axios.post(`${host}/auth/signin`, body)
            .then((res) => {
                if (res.status === 200) {
                    return navigate("/")
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return <form onSubmit={signIn}>
        <div className="flex flex-col space-y-5 ">
            <Text name="Username" type="text" />
            <Text name="Password" type="password" />
            <Submit text="Sign in" />
        </div>
    </form>
    ;
}

function SignUp() {
    const navigate = useNavigate();

    function signUp(ev) {
        ev.preventDefault();
        const body = {
            username: ev.target.username.value,
            password: ev.target.password.value,
            email: ev.target.email.value,
        };

        // TODO: error checking and all
        axios.post(`${host}/auth/signup`, body)
            .then((res) => {
                if (res.status === 200)
                    return navigate("/auth")
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return <form onSubmit={signUp}>
        <div className="flex flex-col space-y-5 ">
            <Text name="Username" type="text" />
            <Text name="Password" type="password" />
            <Text name="Email" type="email" />
            <Submit text="Sign up" />
        </div>
    </form>
    ;
}

export default function Auth() {
    const [type, setType] = useState("signin");

    function switchType(ev) {
        if (ev.target.checked)
            setType("signin");
        else
            setType("signup");
    }

    return <div className="flex flex-col justify-center items-center h-screen">
        <form className="space-x-2 text-xl pb-8" onChange={switchType}>
            <label for="signtype">Sign in</label>
            <input id="signtype" type="checkbox" checked={type == "signin"} />
            <label>Sign un</label>
        </form>

        <div className="w-1/3 h-2/5 shadow bg-gray-300 p-8 flex flex-col justify-between">
            {
                type === "signin" ? <SignIn /> : <SignUp />
            }
        </div>

        <Link to={"/"}><p className="underline text-blue-600 mt-3">Go back!</p></Link>
    </div>
}