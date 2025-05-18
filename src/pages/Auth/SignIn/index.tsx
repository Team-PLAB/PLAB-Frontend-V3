import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { signInType } from '~/types';
import { useAuth } from '~/hooks';
import { setCookie, validateSignIn } from '~/utils';

const SignIn = () => {
  const [signInData, setSignInData] = useState<signInType>({
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<signInType>>({
    login: '',
    password: '',
  });

  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { mutate, isPending } = signIn;

  const handleSubmit = () => {
    const validationErrors = validateSignIn(signInData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ''
    );
    if (hasErrors || isPending) return;

    mutate(signInData, {
      onSuccess: (data) => {
        const accessToken = data?.accessToken;
        if (accessToken) setCookie('accessToken', accessToken);
        alert('로그인에 성공하셨습니다!');
        navigate('/');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleChange = (field: keyof signInType, value: string) => {
    setSignInData({ ...signInData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
		<>
			<div>
				<h1>로그인</h1>
				<div>
					<input
						type="text"
						placeholder="아이디"
						value={signInData.login}
						onChange={e => handleChange('login', e.target.value)}
					/>
					{errors.login && (
						<p
							style={{
								marginTop: '4px',
								fontSize: '14px',
								color: '#ef4444',
							}}
						>
							{errors.login}
						</p>
					)}
				</div>
				<div>
					<input
						type="password"
						placeholder="비밀번호"
						value={signInData.password}
						onChange={e => handleChange('password', e.target.value)}
					/>
					{errors.password && (
						<p
							style={{
								marginTop: '4px',
								fontSize: '14px',
								color: '#ef4444',
							}}
						>
							{errors.password}
						</p>
					)}
				</div>
				<button onClick={handleSubmit} disabled={isPending}>
					{isPending ? '로그인중...' : '로그인하기'}
				</button>
			</div>
			<Link to={'/signup'}>회원가입</Link>
		</>
	)
};

export default SignIn;