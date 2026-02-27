import React from "react";

export const Modal = ({ show, onClose, onConfirm }) => {

    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Delete Contact</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <p>Are you sure you want to delete this contact?</p>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={onConfirm}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};