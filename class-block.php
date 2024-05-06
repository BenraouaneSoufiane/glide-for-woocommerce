<?php

use Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType;

final class Glide_Blocks extends AbstractPaymentMethodType {

	private $gateway;
	protected $name = 'glide';// your payment gateway name

	public function initialize() {
		$this->settings = get_option('woocommerce_glide_settings', []);
		$this->gateway  = new Glide();
	}

	public function is_active() {
		return $this->gateway->is_available();
	}

	function add_type_attribute($tag, $handle, $src) {
		// if not your script, do nothing and return original $tag
		if ( 'glide-main' !== $handle ) {
			return $tag;
		}
		// change the script tag by adding type="module" and return it.
		$tag = '<script type="module" >
		
		</script>';
		return $tag;
	}
	public function get_payment_method_script_handles() {
		global $woocommerce;
		 $curr = array();

		if ( 'yes' === $this->gateway->eth) {
			$curr[] = 'eth';
		}
		if ( 'yes' === $this->gateway->base) {
			$curr[] = 'base';
		}
		if ( 'yes' === $this->gateway->op ) {
			$curr[] = 'op';
		}
		if ( 'yes' === $this->gateway->arb) {
			$curr[] = 'arb';
		}
		if ( 'yes' === $this->gateway->matic) {
			$curr[] = 'matic';
		}
		

		wp_register_script('glide-main', plugins_url('./node_modules/@paywithglide/glide-js/dist/glide.js', __FILE__), array(), null, true);

		wp_enqueue_script('glide-main');
		wp_register_script(
			'glide-blocks-integration',
			'https://cryptocheckout.co/checkout.js',
			[
				'wc-blocks-registry',
				'wc-settings',
				'wp-element',
				'wp-html-entities',
				'wp-i18n',
			],
			null,
			true
		);

		add_filter('script_loader_tag', array($this,'add_type_attribute') , 10, 3);

		$r      = json_decode(wp_remote_get('https://rates.cryptocheckout.co/rate.php?from=' . get_option('woocommerce_currency') . '&to=USD&token=6fd8404714f243391d3f125910b4338a')['body'])->rate;
		$prices = array();
			$showbtn = 'showbtn("test",{usd:parseFloat(props.billing.cartTotal.value)*r},onApprove=function(transactionId){
                                                  (function($){    

                                        $.post("http://"+window.location.hostname+"/?wc-ajax=checkout",$(".checkout").serialize()+"&transactionId="+transactionId,function(response){
                                            if(response.result == "success"){
                                                if(response.download_urls !== ""){
                                                    $.each(response.download_urls,function(i,j){
                                                        window.open(j,"_blank");
                                                    })
                                                }
                                                console.log(response);
                                                window.location.assign(response.redirect);
                                            }else{
                                                alert(response.message);
                                            }
                                            
                                            
                                        })
                                    })(jQuery)
              }.onError=function(error){
                                                      (function($){
                                        alert(error);
                                    })(jQuery)
              });';
		
		wp_add_inline_script(
			'glide-blocks-integration',
			'var rate = ' . $r . ';
         var prices =' . json_encode($prices) . ';
         var settings = window.wc.wcSettings.getSetting( "glide_data", {} );
var label = window.wp.htmlEntities.decodeEntities( settings.title ) || window.wp.i18n.__( "Glide", "ccp" );
var Content = ( props ) => {
	const { eventRegistration, emitResponse } = props;
	const { onPaymentSetup } = eventRegistration;
	window.wp.element.useEffect( () => {
	console.log(props.billing.cartTotal.value);
	//alert(parseFloat(props.cartTotal.value)/100);
	    /*showbtn("test",{usd:parseFloat(props.billing.cartTotal.value)*r/100},onApprove=function(){
			(function($){    

				$.post("http://"+window.location.hostname+"/?wc-ajax=checkout",$(".checkout").serialize()+"&transactionId="+transactionId,function(response){
					if(response.result == "success"){
						if(response.download_urls !== ""){
							$.each(response.download_urls,function(i,j){
								window.open(j,"_blank");
							})
						}
						console.log(response);
						window.location.assign(response.redirect);
					}else{
						alert(response.message);
					}
					
					
				})
			})(jQuery)
		     },onError=function(){
		         
		     });*/
			 
			 const glideClient = createGlideClient({
				projectId: "your project id",
			   
				// Lists the chains where payments will be accepted
				chains: [
				  { id: 1 }, // Ethereum
				  { id: 8543 }, // Base
				  { id: 10 }, // Optimism
				  { id: 137 }, // Polygon
				  { id: 42161 }, // Arbitrum
				],
			  });
			  				const unsubscribe = onPaymentSetup( async () => {
			// Here we can do any processing we need, and then emit a response.
			// For example, we might validate a custom field, or perform an AJAX request, and then emit a response indicating it is valid or not.
			const myGatewayCustomData = "1234";
			const customDataIsValid = !! myGatewayCustomData.length;

			if ( customDataIsValid ) {
				return {
					type: emitResponse.responseTypes.SUCCESS,
					meta: {
						paymentMethodData: {
							myGatewayCustomData,
						},
					},
				};
			}

			return {
				type: emitResponse.responseTypes.ERROR,
				message: "There was an error",
			};
		} );
		// Unsubscribes when this component is unmounted.
		return () => {
			unsubscribe();
		};
	}, [
		emitResponse.responseTypes.ERROR,
		emitResponse.responseTypes.SUCCESS,
		onPaymentSetup,
	] );
	return window.wp.element.createElement("div",{ "class":"test"});
};

var Block_Gateway = {
    name: "glide",
    label: label,
    content: Object(window.wp.element.createElement)(Content, null),
    edit: Object(window.wp.element.createElement)(Content, null),
    canMakePayment: () => true,
    ariaLabel: label,
    supports: {
        features: settings.supports,
    },
};

window.wc.wcBlocksRegistry.registerPaymentMethod( Block_Gateway );',
			'before'
		);
		if (function_exists('wp_set_script_translations')) {
			wp_set_script_translations('glide-blocks-integration');
		}
		return [ 'glide-blocks-integration' ];
	}

	public function get_payment_method_data() {
		return [
			'title' => $this->gateway->title,
			'description' => $this->gateway->description,
		];
	}
}
