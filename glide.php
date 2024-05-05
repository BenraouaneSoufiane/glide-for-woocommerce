<?php

/**
 * Plugin Name: Glide Payments
 * Plugin URI: https://paywithglide.xyz/
 * Description: Cross-token, cross-chain, gasless & without on-ramp payments.
 * Author: Benraouane Soufiane
 * Author URI: https://github.com/BenraouaneSoufiane/
 * Version: 1.0.0
 * Text Domain: ccp
 * Domain Path: /languages
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package extension
 */

defined('ABSPATH') || exit;


add_action('plugins_loaded', 'ccp_init_class', 0);
function ccp_init_class() {
	if (!class_exists('WC_Payment_Gateway')) {
		return; // if the WC payment gateway class
	}

	include(plugin_dir_path(__FILE__) . 'class-gateway.php');
}


add_filter('woocommerce_payment_gateways', 'ccp_add_gateway');

function ccp_add_gateway($gateways) {
	$gateways[] = 'glide';
	return $gateways;
}

/**
 * Custom function to declare compatibility with cart_checkout_blocks feature
*/
function ccp_woo_blocks_support() {
	// Check if the required class exists
	if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
		// Declare compatibility for 'cart_checkout_blocks'
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('cart_checkout_blocks', __FILE__, true);
	}
}
// Hook the custom function to the 'before_woocommerce_init' action
add_action('before_woocommerce_init', 'ccp_woo_blocks_support');

// Hook the custom function to the 'woocommerce_blocks_loaded' action
add_action('woocommerce_blocks_loaded', 'ccp_register');

/**
 * Custom function to register a payment method type

 */
function ccp_register() {
	// Check if the required class exists
	if (! class_exists('Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType')) {
		return;
	}

	// Include the custom Blocks Checkout class
	require_once plugin_dir_path(__FILE__) . 'class-block.php';

	// Hook the registration function to the 'woocommerce_blocks_payment_method_type_registration' action
	add_action(
		'woocommerce_blocks_payment_method_type_registration',
		function (Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry $payment_method_registry) {
			// Register an instance of My_Custom_Gateway_Blocks
			$payment_method_registry->register(new Glide_Blocks());
		}
	);
}

register_activation_hook(__FILE__, 'ccp_activation_notice');
function ccp_activation_notice() {
    
	if (!class_exists('WC_Payment_Gateway')) {
		$notices   = get_option('gpcrypto_deferred_admin_notices', array());
		$notices[] = 'Crypto Checkout requires Woocommerce installed & activated';
		update_option('gpcrypto_deferred_admin_notices', $notices);
	} else {		
		$notices   = get_option('gpcrypto_deferred_admin_notices', array());
		$notices[] = 'You\'re ready to receive crypto, generate your project ID <a href="https://paywithglide.xyz/" target="_black">here</a>';
		update_option('gpcrypto_deferred_admin_notices', $notices);
		// Automatic project ID generation
        /*$r = wp_remote_get('https://paywithglide.co/project-id.php?woo=true');
	    if(!is_wp_error($r) && !empty(json_decode($r['body']))){
		    update_option('gpcrypto_projectid', json_decode($r['body'])->projectid);
		    update_option('gpcrypto_otherfield', json_decode($r['body'])->otherfield);
	    }
		ob_clean();*/
	}
}

register_deactivation_hook(__FILE__, 'ccp_deactivation');
function ccp_deactivation() {
	delete_option('gpcrypto_version');
	delete_option('gpcrypto_deferred_admin_notices');
}


add_action('admin_notices', 'ccp_admin_notices');
function ccp_admin_notices() {
	$notices = get_option('gpcrypto_deferred_admin_notices');
	if(is_array($notices)&&!empty($notices)){
		foreach ($notices as $notice) {
			echo "<div class='updated'><p>" . wp_kses_post($notice) . '</p></div>';
		}
		delete_option('gpcrypto_deferred_admin_notices');
	}
	
}
