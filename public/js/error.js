function triggerError(hook, message, type)
{
    var container = document.getElementById(hook);
    var error = `<div class="alert alert-${type} animated fadeInDown" role="alert">
                    ${message}
                </div>`;

    container.innerHTML = error;

    setTimeout(function() {
        container.innerHTML = '';
    }, 5000);
}

module.exports = {
    trigger: triggerError
}
