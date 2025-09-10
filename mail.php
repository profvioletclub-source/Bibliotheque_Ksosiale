<?php
if (isset($_POST['message']) && isset($_POST['from'])) {
  $to = "tonadresse@mail.fr"; // ← ton adresse personnelle
  $subject = "Message depuis le site Ksos";
  $message = $_POST['message'];
  $headers = "From: " . $_POST['from'];

  $success = mail($to, $subject, $message, $headers);
  if ($success) {
    echo "✅ Message envoyé avec succès.";
  } else {
    echo "❌ Échec de l'envoi.";
  }
}
?>
