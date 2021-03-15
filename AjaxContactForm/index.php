<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="keywords" content="">
		<link rel="icon" type="image/png" href="../images/favicon.png" sizes="64x64">
		<title>Copyright</title>
		<link rel="stylesheet" href="bootstrap.min.css">
		<link rel="stylesheet" href="BWS_Plugins.css">
        <link rel="stylesheet" href="styles.css">
	</head>
	<body>
		<div class="page page--my-account">
			<div class="wrapper">
				<div class="container clearfix">
					<div class="row row__page--my-account">
						<div class="content col-sm-12 col-md-12">
							<div class="content__right">
								<div class="area area--website-crawler-1">
									<div class="area__content">
										<form class="form form--register-copyright" id="my_form" method="post" action="mail.php">
											<h1 class="area__title">Send yourself something</h1>
											<h2 class="area__subtitle">Enter everything what you want</h2>
											<div class="form__body clearfix">
												<div class="form__field-wrapper">
													<div class="form__field col-sm-12">
														<select class="form__select" data-appearance="custom" data-list-height="230" name="gender" required>
															<option value="">Choose your gender</option>
															<option value="male">Male</option>
															<option value="female">Female</option>
															<option value="other">Other</option>
															<option value="secret">Secret</option>
														</select>
													</div>
												</div>
												<div class="form__field-wrapper">
													<div class="form__field col-sm-12">
														<input class="form__input" type="text" maxlength="255" placeholder="Name" name="name" required>
													</div>
												</div>
												<div class="form__field-wrapper">
													<div class="form__field col-sm-12">
														<input class="form__input" type="text" maxlength="255" placeholder="Surname" name="surname" required>
													</div>
												</div>
												<div class="form__field-wrapper">
													<div class="form__field col-sm-12">
														<input class="form__input" type="text" maxlength="255" placeholder="Gmail" name="gmail" required>
													</div>
												</div>
												<div class="form__field-wrapper">
													<div class="form__field col-sm-12">
														<textarea class="form__textarea" maxlength="1000" placeholder="Your text message" name="message" required></textarea>
													</div>
												</div>
												<div class="form__field-wrapper">
													<div class="form__field form__field--tooltip col-sm-12">
														<input class="form__input form__input--tooltip" type="text" maxlength="100" placeholder="Your Stand" name="stand" required>
													</div>
												</div>
											</div>
											<div class="form__footer">
												<button class="button button--big button--start-the-crawler-robot-for-my-website form__button form__button--submit" id="my_form_send" type="submit">Send</button>
											</div>
											<div class="note note--general">It is very important</div>
											<!-- <div class="note note--caution">It is very important</div> -->
                                        </form>
                                        <div id="my_message"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="jquery-3.2.1.min.js"></script>
		<script src="svgxuse.min.js"></script>
		<script src="bootstrap.min.js"></script>
		<script src="rAF.js"></script>
		<script src="BWS_Plugins.js"></script>
		<script src="script.js"></script>
	</body>
</html>