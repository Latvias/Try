$(document).ready(function() {
    let messageCounter = 0;
    const responses = ["Сообщение А", "Сообщение Б", "Сообщение В", "Сообщение Г"];

    function addMessage(content, user) {
        let messageClass = user ? 'user' : 'bot';
        $('#chat-window').append(`<div class="message ${messageClass}">${content}</div>`);
        $('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);
    }

    function getResponse() {
        return responses[messageCounter++ % responses.length];
    }

    function simulateTyping(response, callback) {
        let index = 0;
        let interval = setInterval(() => {
            if (index < response.length) {
                $('#chat-window').find('.message.typing').append(response[index]);
                index++;
            } else {
                clearInterval(interval);
                callback();
            }
        }, 100);
    }

    $('#send-button').on('click', function() {
        let message = $('#message-input').val();
        if (message) {
            addMessage(message, true);
            $('#message-input').val('');
            addMessage('', false);
            $('#chat-window').find('.message.bot').last().addClass('typing');
            simulateTyping(getResponse(), function() {
                $('#chat-window').find('.message.typing').removeClass('typing');
            });
        }
    });

    $('#message-input').on('keypress', function(e) {
        if (e.which === 13) {
            $('#send-button').click();
        }
    });

    $('#microphone-button').on('mousedown', function() {
        const startTime = new Date().getTime();

        $(this).on('mouseup', function() {
            const duration = (new Date().getTime() - startTime) / 1000;
            let response;
            if (duration < 20) {
                addMessage('<img src="png1.png" alt="Audio 1">', true);
                response = "Ответ на аудио 1";
            } else if (duration < 40) {
                addMessage('<img src="png2.png" alt="Audio 2">', true);
                response = "Ответ на аудио 2";
            } else if (duration < 60) {
                addMessage('<img src="png4.png" alt="Audio 3">', true);
                response = "Ответ на аудио 3";
            } else {
                addMessage('<img src="png4.png" alt="Audio 4">', true);
                response = "Ответ на аудио 4";
            }
            addMessage('', false);
            $('#chat-window').find('.message.bot').last().addClass('typing');
            simulateTyping(response, function() {
                $('#chat-window').find('.message.typing').removeClass('typing');
            });
        });
    });

    $('#attach-button').on('click', function() {
        addMessage('<img src="doc.png" alt="Document">', true);
        setTimeout(function() {
            addMessage('<img src="returndoc.png" alt="Returned Document">', false);
            addMessage('вот ваш документ', false);
        }, 10000);
    });
});
