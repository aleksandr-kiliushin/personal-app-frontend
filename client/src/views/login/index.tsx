import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

// Components
import { Form } from '#components/form-constructor/Form'
import { FormRow } from '#components/form-constructor/FormRow'
import { HookFormInput } from '#components/form-constructor/HookFormInput'
import { Button } from '#components/Button'

// Styles
import s from './index.module.css'

export const Login = () => {
	const { register, handleSubmit } = useForm<IFormValues>()

	const logOut = () => {}

	const onSubmit: SubmitHandler<IFormValues> = async ({ password, username }) => {}

	if (!!localStorage.authToken) {
		return (
			<div className={s.Container}>
				<p className={s.Centered}>
					You are logged in as <strong>sasha</strong>.
				</p>

				<Button background="red" onClick={logOut}>
					Log out
				</Button>
			</div>
		)
	}

	return (
		<div className={s.Container}>
			<h1 className={s.Centered}>Welcome</h1>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormRow label="Username">
					<HookFormInput {...register('username', { required: true })} />
				</FormRow>

				<FormRow label="Password">
					<HookFormInput type="password" {...register('password', { required: true })} />
				</FormRow>

				<Button type="submit">Log in</Button>
			</Form>
		</div>
	)
}

interface IFormValues {
	password: string
	username: string
}
