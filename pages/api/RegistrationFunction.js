
import Cookies from 'js-cookie';
import { URLADRESS } from '@/components/Constants';

export default async function RegistrationFunction(body) {
    let JWTToken
    let Errormasage

    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (24 * 60 * 60 * 1000));
    try {
        const response = await fetch(URLADRESS + '/authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),

        });
        if (response.ok) {
            const data = await response.json()
                .then(data => {
                    Cookies.set('jwtToken', data.token, { expires: currentDate });
                    Cookies.set('userName', data.username, { expires: currentDate });
                    JWTToken = data.token;
                })

        } else {
            console.log(response)
            alert('Користувач з такою поштою або телефоном вже існує!');
            Errormasage = true;
        };
    } catch (error) {
        alert('Упс.... Щось пішло не так. зверніться до розробників');
        Errormasage = true;
    };
    return { JWTToken, Errormasage }
}