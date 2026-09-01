<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'submit']);
Route::post('/contact/track', [ContactController::class, 'trackWhatsapp']);
