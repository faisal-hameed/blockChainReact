import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { PageHeading } from '../core/pageHeading';

class Signing extends Component {
    ip = 'http://13.126.11.59:8000';

    constructor(props) {
        super(props)
        this.state = { data: '', privateKey: '', walletAddress: '', signature: '', validateSignature: '' };

        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSignatureChange = this.handleSignatureChange.bind(this);

        this.handleSignDataSubmit = this.handleSignDataSubmit.bind(this);
        this.handleValidateSubmit = this.handleValidateSubmit.bind(this);
    }
    handleDataChange(event) {
        this.setState({ data: event.target.value });
    }
    handleKeyChange(event) {
        this.setState({ privateKey: event.target.value });
    }
    handleAddressChange(event) {
        this.setState({ walletAddress: event.target.value });
    }
    handleSignatureChange(event) {
        this.setState({ signature: event.target.value });
    }

    async handleSignDataSubmit(event) {
        event.preventDefault();
        let body = { data: this.state.data, privateKey: this.state.privateKey }

        const rawResponse = await fetch(`${this.ip}/gateway/sign/generate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        console.log('Sign data response : ', content);
        this.setState({ signature: content.signature })

    }

    async handleValidateSubmit(event) {
        event.preventDefault();
        let body = { data: this.state.data, signature: this.state.signature, walletAddress: this.state.walletAddress }

        const rawResponse = await fetch(`${this.ip}/gateway/sign/validate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        console.log('Validate response : ', content)
        this.setState({ validateSignature: content.isValid })
    }

    render() {
        return (
            <div className="container">
                <PageHeading heading="Data Signing" subHeading="Proof of ownership" />

                <div className="row">
                    <div className="col-md-12">
                        <h4>Signing</h4>
                    </div>
                </div>

                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-8">
                            <Form onSubmit={this.handleSignDataSubmit}>
                                <div className="row">
                                    <div className="col-md-2">
                                        Data
                            </div>
                                    <div className="col-md-10">
                                        <Form.Control type="text" placeholder="Data to be signed" value={this.state.data} onChange={this.handleDataChange} />
                                    </div>
                                </div>
                                <div className="row mt-2 mb-2">
                                    <div className="col-md-2">
                                        Private Key
                            </div>
                                    <div className="col-md-10">
                                        <Form.Control type="text" placeholder="User's private key" value={this.state.privateKey} onChange={this.handleKeyChange} />
                                    </div>
                                </div>
                                <div className="row mt-2 mb-2">
                                    <div className="col-md-12 text-center">
                                        <Button variant="primary" type="submit">Sign</Button>
                                    </div>
                                </div>
                            </Form>
                            <div className="row mt-3">
                                <div className="col-md-2">
                                    Signature
                        </div>
                                <div className="col-md-10">
                                    <Form.Control as="textarea" rows="3" value={this.state.signature} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <Form.Control as="textarea" rows="9" value="" readOnly />

                        </div>
                    </div>


                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <h4>Validation</h4>
                    </div>
                </div>
                <div className="jumbotron">
                   <div className="row">
                   <div className="col-md-8">
                   <Form onSubmit={this.handleValidateSubmit}>
                        <div className="row">
                            <div className="col-md-2">
                                Data
                            </div>
                            <div className="col-md-10">
                                <Form.Control type="text" placeholder="Data against which signature is generated" value={this.state.data} onChange={this.handleDataChange} />
                            </div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col-md-2">
                                Wallet Address
                            </div>
                            <div className="col-md-10">
                                <Form.Control type="text" placeholder="User's wallet address" value={this.state.walletAddress} onChange={this.handleAddressChange} />
                            </div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col-md-2">
                                Signature
                            </div>
                            <div className="col-md-10">
                                <Form.Control as="textarea" placeholder="Signature to be validated" rows="3" value={this.state.signature} onChange={this.handleSignatureChange} />
                            </div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col-md-12 text-center">
                                <Button variant="primary" type="submit">Validate</Button>
                            </div>
                        </div>
                    </Form>
                    <div className="row">
                        <div className="col-md-2">
                            Signature is
                        </div>
                        <div className="col-md-10">
                            <Form.Control type="text" value={this.state.validateSignature} readOnly />
                        </div>
                    </div>
                   </div>

                   <div className="col-md -4">
                   <Form.Control as="textarea" rows="11" value="" readOnly />

                   </div>
                   </div>
                </div>
            </div>
        );
    }
}

export default Signing;
