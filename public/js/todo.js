      
            $(function() {
                  $('#logout').on('click', function() {
                    
                    window.location.replace('/logout')  
                  });            

            
            	$('.addBtn').on('click', function() {
            	 $('#myUL:last-child').hide();
            	var todo = $('input[name="myInput"]').val();
            	var priority = $('select[name="myPriority"]').val()
            	$('input[name="myInput"]').val('');
            		$.ajax({
            type: 'POST',
            url: '/addItem',
            data:{text: todo, imp: priority},
            success: function(data) {
				$('#myUL').empty();
				$('#myUL').append(data);
				
				var myNodeList = $('LI');
				
				for(var i=0;i<myNodeList.length; i++) {
					$(myNodeList[i]).append('<span class="close">\u00D7</span>');
        } 
        $('#myUL:last-child').show();
          		  }
        });
            	});
            	
            });
            
            
            $(document).on('click', '.close', function() {
            	var par = $(this).parent()
			var ElId =$(par).attr('id');
           		$.ajax({
          		  type: 'POST',
          		  url: '/delItem',
          		  data:{id:ElId},
          		  success: function() {
					$(par).remove();
				
          		  }
        		});			
            });
            
            $(document).ready(function() {
           		$.ajax({
          		  type: 'POST',
          		  url: '/loadItems',
          		  success: function(data) {
				$('#myUL').empty();
				$('#myUL').append(data);
				
				var myNodeList = $('LI');
				
				for(var i=0;i<myNodeList.length; i++) {
					$(myNodeList[i]).append('<span class="close">\u00D7</span>');
				} 
          		  }
        		});
        		

            });
