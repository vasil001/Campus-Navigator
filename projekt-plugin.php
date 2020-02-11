<?php
/**
 * @package ProjektPlugin
 */

/*
Plugin Name: China Projekt Plugin
Description: Campus Map Navigation of FRAUAS
Author: Front-End Group
Version: 1.0
*/

defined('ABSPATH') or die('Go!');

class ProjektPlugin{

	function register(){

		// admin_ for backend, wp_ for frontend
		add_action('wp_enqueue_scripts', array($this, 'enqueue'));
		add_shortcode( 'map', array($this, 'mapPlugin'));
	}

	function mapPlugin(){
		ob_start();
		
		wp_enqueue_script( 'mypluginscript2', plugins_url( '/assets/map.js',__FILE__) );
		wp_enqueue_script( 'searchscript', plugins_url( '/assets/search/searchDemo.js',__FILE__) );

		return ob_get_clean();
	}

	function enqueue(){
		//enqueue all our scripts
		wp_enqueue_style( 'bootstrap', plugins_url( '/assets/search/bootstrap.min.css',__FILE__) );
		wp_enqueue_style( 'bootstrap', plugins_url( '/assets/search/custom.css',__FILE__) );
		wp_enqueue_style( 'mypluginstyle', plugins_url( '/assets/leafletStyle.css',__FILE__));
		wp_enqueue_style( 'mypluginstyle3', plugins_url( '/assets/leafletGeocoder.css',__FILE__) );
		wp_enqueue_style( 'mypluginstyle4', plugins_url( '/assets/leafletRouting.css',__FILE__) );
		wp_enqueue_style( 'easyButton1', plugins_url( '/assets/easy-button.css',__FILE__) );



		wp_enqueue_script( 'mypluginscript', plugins_url( '/assets/leafletScript.js',__FILE__) );
		wp_enqueue_script( 'mypluginscript4', plugins_url( '/assets/leafletRouting.js',__FILE__) );
		wp_enqueue_script( 'mypluginscript4', plugins_url( '/assets/leafletRouting.min.js',__FILE__) );
		wp_enqueue_script( 'graphHooper', plugins_url( '/assets/lrm-graphhopper-1.2.0.js',__FILE__) );
		wp_enqueue_script( 'mypluginscript3', plugins_url( '/assets/leafletGeocoder.js',__FILE__) );
		wp_enqueue_script( 'jQueryScript', plugins_url( '/assets/search/jquery.min.js',__FILE__) );
		wp_enqueue_script( 'easyButton2', plugins_url( '/assets/easy-button.js',__FILE__) );
	} 
}

if (class_exists('ProjektPlugin')) {
	$projektplugin = new ProjektPlugin();
	$projektplugin -> register();

}

// activation
register_activation_hook(__File__, array($projektplugin, 'activate'));

// deaactivation
register_deactivation_hook(__File__, array($projektplugin , 'deactivate'));
