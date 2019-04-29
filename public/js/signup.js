                    function checkEmail() {
  
                      var email = document.getElementById('txtEmail');
                      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
                      if (!filter.test(email.value)) {
                      alert('Please provide a valid email address');
                      email.focus;
                      return false;
                      }
                      return true;
                  }

                    function Validate() {
                        var password = document.getElementById("txtPassword").value;
                        var confirmPassword = document.getElementById("txtConfirmPassword").value;
                        if (password != confirmPassword) {
                            alert("Passwords do not match.");
                            return false;
                        }
                        return true;
                    }
                    
                    // Get the modal
                    var modal = document.getElementById('id01');
                    
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                      if (event.target == modal) {
                        modal.style.display = "none";
                      }
                    }

                    $('#login').on('click', function() {
                      window.location.replace('/login');
                    });