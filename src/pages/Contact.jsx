import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import CardContact from "../components/CardContact";

export const Contact = () => {

    const { store, dispatch } = useGlobalReducer();

    const API_URL = "https://playground.4geeks.com/contact";

    //logica fetchs
    const getAgenda = () => {

        fetch(API_URL + "/agendas/vicente")
            .then((response) => {

                if (response.status === 404) {
                    createAgenda();
                }

                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.log("error:", error));
    };


    const createAgenda = () => {

        fetch(API_URL + "/agendas/vicente", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log("error:", error));
    };


    const getContacts = () => {

        fetch(API_URL + "/agendas/vicente/contacts")
            .then(response => response.json())
            .then((data) => {

                dispatch({
                    type: "setContacts",
                    payload: data.contacts
                });

            })
            .catch((error) => console.log("error:", error));
    };

    const deleteContact = (id) => {


        dispatch({
            type: "delete_contact",
            payload: id
        });


        fetch(API_URL + "/agendas/vicente/contacts/" + id, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                console.log("Deleted in api");
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };

    useEffect(() => {
        getAgenda();
        getContacts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col text-end">
                    <Link to="/add-contact">
                        <button className="btn btn-success">
                            Add new contact
                        </button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {store.contacts.length === 0 ? (
                        <div className="text-center mt-5">
                            <h5 className="text-muted">
                                No tienes contactos agregados aún
                            </h5>
                        </div>
                    ):(

                        store.contacts.map((contact) => (
                            <CardContact
                                key={contact.id}
                                contact={contact}
                                deleteContact={deleteContact}
                            />
                        ))

                    )}
                </div>
            </div>

        </div>
    );
};