var stop = 1;
var minutes = 0;
var seconds = 0;
var hours = 0;
window.onload = function() {
    setInterval(function() {
        if (stop === 0) {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hours++;
                minutes = 0;
                seconds = 0;
            }
            $('.stopWatch').html(hours + ':' + minutes + ':' + seconds);
        }
    }, 1000);
};

var allCards = [];
var hardCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

// add each card to the allCards list 
var cardNo = 0;
$('.deck').each(function() {
    $(this).find('li').each(function() {
        allCards.push($(this));
    });
    $(this).find('li').find('i').each(function() {
        var newClass = $($(allCards[cardNo][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(newClass);
        cardNo++;
    });
});

// shuffle all the cards in the list 
hardCard = shuffle(hardCards);

var cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(hardCards[cardNumber]);
        cardNumber++;
    });
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// array to store open cards
var openCards = [];
var moves = 1;
var stars = 3;

// function to remove property after 150 milliSecond
remove = function(self) {
    setTimeout(function() {
        self.removeClass('show open animated tada');
        openCards[0].removeClass('show open animated tada');
        openCards = [];
    }, 150);
};

// function to display the clicked card
showCard = function(card) {
    card.on('click', function() {
        stop = 0;
        $('section .moves').html(moves);
        if (openCards.length % 2 === 0) {
            $(this).addClass('show open animated tada');
            openCards.push($(this));
            $(this).off('click');
        } else if (openCards.length != 0) {
            $(this).addClass('show open animated tada');
            var self = $(this);
            for (var j = 0; j < openCards.length; j++) {
                if ((openCards[j].find('i').attr('class')) === (self.find('i').attr('class'))) {
                    self.removeClass('animated tada');
                    self.addClass('show match animated shake');
                    openCards[j].removeClass('animated tada');
                    openCards[j].addClass('show match animated shake');
                    //console.log('match');
                    //openCards.push(self);
                    $(this).off('click');
                    openCards = [];
                    moves++;
                    break;
                } else {
                    self.addClass('show open animated tada');
                    remove(self);
                    openCards[0].on('click', showCard(openCards[0]));
                    moves++;
                    //console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {
                    //$(this).find('li').hide();
                    swal({
                        type: 'success',
                        title: 'Congrats Man !!!',
                        text: 'You were brave enough to complete the game in just ' + moves + ' moves and ' + stars + ' stars in just ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds. I hope you you wanna give it another shot, just hit the button below !!!',
                        confirmButtonText: 'I wanna play Again',
                        confirmButtonColor: '#00FF00',
                        focusConfirm: true,
                        showCancelButton: true,
                        cancelButtonText: 'No Thanks',
                        cancelButtonColor: '#FF0000',
                        allowOutsideClick: false
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        window.close();
                    });
                });
            }, 300);
            stop = 1;
            $('.stopWatch').html('0:0:0');
        }
        if (moves > 20) {
            $('#star3').hide();
            stars = 2;
        }
        if (moves > 25) {
            $('#star2').hide();
            stars = 1;
        }
    });
};

//add click listner to each card 
for (var i = 0; i < allCards.length; i++) {
    allCards[i].on('click', showCard(allCards[i]));
}

// restart button 
$('.restart').on('click', function() {
    location.reload();
});