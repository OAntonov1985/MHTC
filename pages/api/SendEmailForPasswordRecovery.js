import { URLADRESS } from '@/components/Constants';

export default async function SendEmailForPasswordRecovery(body) {
    let Errorflag
    console.log(body)

    try {
        const response = await fetch(URLADRESS + 'users/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),

        });

        if (response.ok) {
            const data = await response.json()
                .then(data => {
                    console.log(data)
                })

        } else {
            alert('Такої адреси електронної пошти не знайдено. Спробуйте ще!');
            Errorflag = true;
        };
    } catch (error) {
        alert('Упс.... Щось пішло не так');
        Errorflag = true;
    };
    return { Errorflag }
}