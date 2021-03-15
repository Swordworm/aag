<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'vendor/phpmailer/phpmailer/src/Exception.php';
    require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require 'vendor/phpmailer/phpmailer/src/SMTP.php';

    $mail = new PHPMailer();



    $gender = $_POST['gender'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $gmail = $_POST['gmail'];
    $message = $_POST['message'];
    $stand = $_POST['stand'];
    //Tell PHPMailer to use SMTP
    $mail->isSMTP();
    $mail->Mailer = "smtp";
    $mail->SMTPDebug = 2;
    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';
    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';
    // use
    // $mail->Host = gethostbyname('smtp.gmail.com');
    // if your network does not support SMTP over IPv6
    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;
    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = "testingformsending@gmail.com";
    //Password to use for SMTP authentication
    $mail->Password = "ASDqwe123";
    //Set who the message is to be sent from
    $mail->setFrom('message@gmail.com', 'Anonymous');
    //Set an alternative reply-to address
    // $mail->addReplyTo('replyto@example.com', 'First Last');
    //Set who the message is to be sent to
    $mail->addAddress($gmail, 'Somebody');
    //Set the subject line
    $mail->Subject = 'Message for you';
    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    // $mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
    //Replace the plain text body with one created manually
    $mail->Body = 'Your gender: ' . $gender . "\n" . 
                    'Your name: ' . $name . "\n" . 
                    'Your surname: ' . $surname . "\n" . 
                    'Your message: ' . $message . "\n" . 
                    'Your the most powerful stand: ' . $stand;
    //Attach an image file
    //send the message, check for errors

    if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
    echo "Message sent!";
    }
