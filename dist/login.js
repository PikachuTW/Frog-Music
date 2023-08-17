const submit = async () => {
    const username = document.getElementById('t_username').value;
    const password = document.getElementById('t_password').value;
    const errorMessage = document.getElementById('errorMessage');
    if (!username || !password) {
        errorMessage.innerText = '❌未提供帳戶或密碼';
        errorMessage.hidden = false;
        return;
    }
    const data = await fetch(`/api/loginApi?username=${username}&password=${password}`);
    const res = await data.json();
    if (data.status === 401) {
        errorMessage.innerText = res.error;
        errorMessage.hidden = false;
    } else {
        window.location.href = '/notjoin';
    }
};
