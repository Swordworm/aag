$(document).ready(function(){
    let degrees;
    let degreesStart = 0;
    const items = $( '.item' );
    const carouselClasses = [ 'previous-item', 'current-item', 'next-item' ];

    carouselClasses.forEach( function( element, index ) {
        items[index].classList.add( element );
    });

    function rotation( angle ) {
        var item = $( '.item' );
        $({deg: degreesStart}).animate({deg: angle}, {
            step: function( now ) {
                item.css({
                    transform: 'rotate(' + (-now) + 'deg)'
                });
            },
        });
        degreesStart = degrees;
    }

    $( 'body' ).on( 'mousedown touchstart', function(e) {
        let xStart = e.originalEvent;
        let x = xStart.pageX;
        $( 'body' ).on( 'mousemove touchmove', function(e) {
            var move = e.originalEvent;
            let moveX = move.pageX;
            degrees = moveX - x;
            rotation( degrees );
        } );
    } ).on( 'mouseup touchend', function() {
        $( 'body' ).off( 'mousemove touchmove' );
    } );

});