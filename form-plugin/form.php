<?php
/* Plugin Name: Form */
/* Description: Form for sending information through ajax */
function contact_form() {
    $content = '';
    $content .= '<form method="post" action="" id="contact-form">';

    $content .= '<div id="response_div"></div>';

    $content .= '<label for="your_name" class="col-md-3">Your Name</label>';
    $content .= '<input type="text" name="your_name" id="your_name" class="form__input col-md-9" placeholder="Enter your name" />';

    $content .= '<label for="your_email" class="col-md-3">Your Email</label>';
    $content .= '<input type="text" name="your_email" id="your_emaile" class="form__input col-md-9" placeholder="Enter your email address" />';

    $content .= '<label for="phone_number" class="col-md-3">Your Phone Number</label>';
    $content .= '<input type="text" name="phone_number" id="phone_number" class="form__input col-md-9" placeholder="Enter your phone number" />';

    $content .= '<label for="your_comments" class="col-md-3">Questions or comments</label>';
    $content .= '<textarea name="your_comments" id="your_comments" class="form__textarea col-md-9" placeholder="Leave a comment"></textarea>';

    $content .= '<input type="submit" name="form_contact_submit" id="form_contact_submit" class="button button--big button--start-the-crawler-robot-for-my-website form__button form__button--submit" value="SUBMIT" />';
    
    $content .= '</form>';
    

    return $content;

}
function myajax_data() {
	wp_localize_script( 'foodrecipe_script', 'myAjax', array( 
        'url' => admin_url( 'admin-ajax.php' ))
    );
}

function my_action_callback() {
	/**
     * First we make some validations, 
     * I think you are able to put better validations and sanitizations. =)
     */
 
    // This is the email where you want to send the comments.
    $to = 'alexeigalimov@gmail.com';
 
    // Your message subject.
    $subject = 'Testing Ajax Form';

    $body  = $_POST['your_name'];
    $body .= $_POST['phone_email'];
    $body .= $_POST['phone_number'];
    $body .= $_POST['your_comments'];
    $headers = array('Content-Type: text/html; charset=UTF-8');
    // This are the message headers.
    // $headers = array('Content-Type: text/html; charset=UTF-8');

    $result = wp_mail( $to, $subject, 'test', $headers );
    var_dump($result);
    echo 'Success';

    wp_die();
}

function add_javascript() {
    ?>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ) ?>js/form.js"></script>
    <?php
}

add_shortcode( 'contact_form', 'contact_form' );
add_action( 'wp_footer', 'add_javascript', 99 );
add_action( 'wp_head', 'myajax_data', 98 );
add_action( 'wp_ajax_my_action', 'my_action_callback' );
add_action( 'wp_ajax_nopriv_my_action', 'my_action_callback' );


// add_action('wp_ajax_send_form', 'send_form'); // This is for authenticated users
// add_action('wp_ajax_nopriv_send_form', 'send_form'); // This is for unauthenticated users.
 
/**
 * In this function we will handle the form inputs and send our email.
 *
 * 
 */
 
// function send_form(){
//     /**
//      * First we make some validations, 
//      * I think you are able to put better validations and sanitizations. =)
//      */
 
//     // This is the email where you want to send the comments.
//     $to = 'ourcompanysemail@example.com';
 
//     // Your message subject.
//     $subject = 'Now message from a client!';
    
//     $body  = 'From: ' . $_POST['name'] . '\n';
//     $body .= 'Email: ' . $_POST['name'] . '\n';
//     $body .= 'Message: ' . $_POST['comment'] . '\n';
 
//     // This are the message headers.
//     // You can learn more about them here: https://developer.wordpress.org/reference/functions/wp_mail/
//     $headers = array('Content-Type: text/html; charset=UTF-8');
     
//     wp_mail( $to, $subject, $body, $headers );
 
//     echo 'Done!';
//     wp_die();
// }