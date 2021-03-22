(function($){
    $( document ).ready( function() {
        $( '#form_contact_submit' ).click( function() {
            $.ajax({
                url: myAjax.url, // Here goes our WordPress AJAX endpoint.
                data: {
                    action: 'my_action',
                },
                type: 'post',
                beforeSend: function() {
                    console.log( 'Almost ready' );
                },
                success: function(response) {
                    // You can craft something here to handle the message return
                    console.log(response);
                },
            });
            // This return prevents the submit event to refresh the page.
            return false;
        });
    })
})(jQuery);
