import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isRef, setIsRef] = useState("");
    const [isAssigner, setIsAssigner] = useState("");

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const roles = ["Ref"];
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, phone, firstName, lastName, roles })
            });

            if (!res.ok) throw new Error("Registration Failed");

            Navigate({to: "/login"});
        }
        catch (err) {
            alert("Registration Failed");
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
            /> 
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Cell Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
            />
            <input 
                type="checkbox" 
                placeholder="Ref"
                value={isRef}
                onChange={e => setIsRef(e.target.value)}
            />
            <input 
                type="checkbox" 
                placeholder="Assigner"
                value={isAssigner}
                onChange={e => setIsAssigner(e.target.value)}
            />
        <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationPage;