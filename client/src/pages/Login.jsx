import axios from 'axios'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required")
})

const Login = () => {
    const navigate = useNavigate()
    const [serverError, setserverError] = useState("")
    const [successMsg, setsuccessMsg] = useState("")

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setserverError("")
        setsuccessMsg("")

        try {
            const res = await axios.post("http://localhost:5006/api/auth/login", values)
            if (res.status === 200 || res.status === 201) {
                setsuccessMsg("Login successful, redirecting to dashboard...")
                resetForm()
                setTimeout(() => {
                    navigate("/dashboard")
                }, 1500)
                setSubmitting(false)
            } else {
                setserverError("Login failed, please try again")
            }
        } catch (error) {
            console.error(error, error.message, error.request)
            setSubmitting(false)
            if (error.response.data.message) {
                setserverError(error.response.data.message)
            } else {
                setserverError("An error occurred, please try again later")
            }
        }
    }
    return (
        <div className='container mt-5'>
            <h1>Login to your Account</h1>
            {serverError && (<p className='text-danger'>{serverError}</p>)}
            {successMsg && (<p className='text-success'>{successMsg}</p>)}
            <Formik
                validateSchema={loginSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-floating mb-3 w-50">
                            <Field type="email" className="form-control" id="email" placeholder="name@example.com" name="email" />
                            <label htmlFor="email">Email address</label>
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="form-floating w-50 mb-3">
                            <Field type="password" className="form-control" id="password" placeholder="Password" name="password" />
                            <label htmlFor="password">Password</label>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
                    </Form>
                )}

            </Formik>
            <p style={{ marginTop: "10px" }}>
                Don’t have an account?{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                >
                    Register
                </span>
            </p>
        </div>
    )
}

export default Login