<?php

class Crypto_Checkout extends WC_Payment_Gateway {

		   public $id;
			  public $icon;
			  public $has_fields;
			  public $method_title;
			  public $method_description;
			  public $title;
			  public $description;
			  public $enabled;
			  public $eth;
			  public $base;
			  public $op;
			  public $arb;
			  public $matic;
			  private $transactions;
			  public $projectid;
			  public $otherfield;


  // Constructor method
	public function __construct() {


				// Other initialization code goes here
				$this->id   = 'glide'; // payment gateway plugin ID
				$this->icon = ''; // URL of the icon that will be displayed on checkout page near your gateway name
				/*   $this->has_fields = true; */// in case you need a custom credit card form
				$this->method_title       = __('Glide', 'ccp');
				$this->method_description = __('Accept cross-chain, cross-token crypto payements on your store', 'ccp'); // will be displayed on the options page
				$this->has_fields         = true;
				// gateways can support subscriptions, refunds, saved payment methods,
				// but in this tutorial we begin with simple payments
				$this->supports = array(
					'products'
				);


				$this->title        = $this->get_option('title');
				$this->description  = $this->get_option('description');
				$this->enabled      = $this->get_option('enabled');
				$this->eth          = $this->get_option('eth');
				$this->base          = $this->get_option('base');
				$this->op         = $this->get_option('op');
				$this->arb          = $this->get_option('arb');
				$this->matic          = $this->get_option('matic');
				
                $this->update_option('projectid', get_option('gpcrypto_projectid'));
				$this->update_option('otherfield', get_option('gpcrypto_otherfield'));
				$this->init_form_fields();
				$this->init_settings();

				add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
				add_action('wp_enqueue_scripts', array( $this, 'payment_scripts' ));
				add_action('admin_print_scripts-woocommerce_page_wc-settings', array( $this, 'print_helper_script' ));
	}
   
	public function init_form_fields() {
		$this->form_fields = array(
			        
					'enabled' => array(
						'title'       => __('Enable/Disable', 'ccp'),
						'label'       => __('Enable Glide Payments', 'ccp'),
						'type'        => 'checkbox',
						'description' => '',
						'default'     => 'no'
					),
					'title' => array(
						'title'       => __('Title', 'ccp'),
						'type'        => 'text',
						'description' => __('This controls the title which the user sees during checkout.', 'ccp'),
						'default'     => __('Pay using crypto currencies', 'ccp'),
						'desc_tip'    => true,
					),
					'description' => array(
						'title'       => __('Description', 'ccp'),
						'type'        => 'textarea',
						'description' => __('This controls the description which the user sees during checkout.', 'ccp'),
						'default'     => __('Pay using your crypto funds via our super-cool payment gateway.', 'ccp'),
					),					
				
					'eth' => array(
						'title'       => 'Ethereum',
						'label'       => 'Enable Ethereum',
						'type'        => 'checkbox',
						'description' => '',
						'default'     => 'yes'
					),
					'base' => array(
						'title'       => 'Base',
						'label'       => 'Enable Base',
						'type'        => 'checkbox',
						'description' => '',
						'default'     => 'yes'
					),
					'op' => array(
						'title'       => 'Optimism',
						'label'       => 'Enable Optimism',
						'type'        => 'checkbox',
						'description' => '',
						'default'     => 'yes'
					),
					'arb' => array(
						'title'       => 'Arbitrum One',
						'label'       => 'Enable Arbitrum One',
						'type'        => 'checkbox',
						'description' => '',
						'default'     => 'yes'
					),
					'matic' => array(
						'title'       => 'Polygon',
						'label'       => 'Enable Polygon',
						'type'        => 'checkbox',
						'description' => '',
						'default'     => 'yes'
					)
				);
	}
	public function process_payment($order_id) {
		global $woocommerce;
		   $pds           = $woocommerce->cart->get_cart();
		   $total         = 0;
		   $download_urls = array();
		foreach ($pds as $p => $v) {
				  $product   = wc_get_product($v['product_id']);
				  $downloads = $product->get_downloads();
			foreach ($downloads as $key => $each_download) {
				$download_urls[] = $each_download['file'];
			}
				  $total += get_post_meta($v['product_id'], '_price', true) * $v['quantity'];
		}
		        $r     = json_decode(wp_remote_get('https://rates.cryptocheckout.co/rate.php?from=' . get_option('woocommerce_currency') . '&to=USD&token=6fd8404714f243391d3f125910b4338a')['body'])->rate;
		        $total = $total * floatval($r);

				$r1 = json_decode(wp_remote_get('https://cryptocheckout.co/?transaction=' . sanitize_text_field($_POST['transactionId']))['body']);
				$r  = json_decode(wp_remote_get('https://rates.cryptocheckout.co/rate.php?from=USD&to=' . $r1->curr . '&token=6fd8404714f243391d3f125910b4338a')['body'])->rate;

			if ($r1->completed == true && abs(floatval($r1->amount) - ( $total * floatval($r1->rate) )) < 0.0000001) {
				$transactions = get_option('transactions');
				if (empty($transactions)) {
						  $transactions   = array();
						  $transactions[] = sanitize_text_field($_POST['transactionId']);
						  update_option('transactions', $transactions);
						  return $this->completeorder($order_id, $download_urls);
				} else {
					foreach ($transactions as $transaction => $hash) {
						if ($hash == sanitize_text_field($_POST['transactionId'])) {
							$exist = true;
							break;
						} elseif ($transaction == count($transactions) - 1 && $exist == false) {
							$transactions[] = sanitize_text_field($_POST['transactionId']);
							update_option('transactions', $transactions);
							return $this->completeorder($order_id, $download_urls);
						}
					}
				}
			}
		 
	}
	public function payment_scripts() {
	}
	public function print_helper_script() {
		?>
				<script src='/wp-includes/js/jquery/jquery.min.js'></script>
				<script>
					//Some js script (will printed into admin dashboard glide settings's section)
				</script>
				<?php
	}
}
