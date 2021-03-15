(function($){
    const forestImage = $( '.routes-activities .forest-image' );
     var rightPositionForest = ( $( window ).width() - ( forestImage.offset().left + forestImage.outerWidth()));
    let leftPositionContent = $( '.routes-activities .left-content' ).offset().left;
    let moveLeftContent = leftPositionContent - 50;
    let moveRightForest = rightPositionForest + moveLeftContent - 20;
    let maxWidthForest =  forestImage.width() + moveRightForest;
    $( '.logo h1' ).hover( function() {
        $( this ).css( {"color": "#ff0000", "transition": "2s"} )
        }, function() {
            $( this ).css( {"color": "#fff"} )
    });
    $( '.routes-activities .left-content' ).hover( function() {
        $( this ).css( {"transform": "scale(1.02)"} );
    }, function() {
        $( this ).css( {"transform": "scale(1)"} );
    } )
    $( '.routes-activities .right-content' ).hover( function() {
        forestImage.css( {"width": maxWidthForest + "px", "transform": "translateX(-" + moveLeftContent + "px)"} );
        $( '.routes-activities .left-content' ).css( {"transform": "translateX(-" + moveLeftContent + "px)"} );
    }, function() {
        forestImage.css( {"width": "100%", "transform": "translateX(0)"} );
        $( '.routes-activities .left-content' ).css( {"transform": "translateX(0)"} );
    } );
})(jQuery);