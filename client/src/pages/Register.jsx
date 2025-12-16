import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as yup from 'yup'

const registerSchema = yup.object().shape({
    fullname: yup.string().min(3, "Fullname must be at least 3 characters").required("Fullname is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain uppercase, lowercase, number and special characters")
})
const Register = () => {
    const navigate = useNavigate()
    const [serverError, setserverError] = useState("")
    const [successMsg, setsuccessMsg] = useState("")

    const initialValues = {
        fullname: "",
        email: "",
        password: ""
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setserverError("")
        setsuccessMsg("")

        try {
            const res = await axios.post("http://localhost:5006/api/auth/register", values)
            if (res.status === 200 || res.status === 201) {
                setsuccessMsg("Registration successful, redirecting to login...")
                resetForm()
                setTimeout(() => {
                    navigate("/login")
                }, 1500)
                setSubmitting(false)
            } else {
                setserverError("Registration failed, please try again")
            }
        } catch (error) {
            console.error(error, error.response, error.message, error.request)
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
            <h1>Register Here</h1>
            {serverError && (<p className='text-danger'>{serverError}</p>)}
            {successMsg && (<p className='text-success'>{successMsg}</p>)}

            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-floating mb-3 w-50">
                            <Field type="text" className="form-control" id="fullname" placeholder="Fullname" name="fullname" />
                            <label htmlFor="fullname">Fullname</label>
                            <ErrorMessage name="fullname" component="div" className="text-danger" />
                        </div>
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
                        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>{isSubmitting ? 'Registering...' : 'Register'}</button>
                    </Form>
                )}
            </Formik>

            <p style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </span>
            </p>
        </div>
    )
}

export default Register