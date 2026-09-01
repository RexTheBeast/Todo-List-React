import { useState } from "react";

export default function Logon({
    onSetEmail,
    onSetToken,
}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")
    const [isLoggingOn, setIsLoggingOn] = useState(false)


    async function handleSubmit(e){
        e.preventDefault();
        setIsLoggingOn(true);
        setAuthError("")

        try{
            const response = await fetch("/api/users/logon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (response.status === 200){
                const data = await response.json();
                onSetEmail(data.name);
                onSetToken(data.csrfToken);
            }else{
                setAuthError("Invalid email or password.");
            }
        } catch(err) {
            console.log(err)
            setAuthError("Network error. Please try again.");
        } finally{
            setIsLoggingOn(false);
        }
    }

    return (
    <div>
        <h2>Logon</h2>

        {authError && <p style={{ color: "red" }}>{authError}</p>}

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
            id="email"
            name= "email"
            required
            autoComplete="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
            required
            name= "password"
            autoComplete="current-password"
            id = "password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoggingOn}>
            {isLoggingOn ? "Logging in..." : "Log In"}
            </button>
        </form>
    </div>
    );
}