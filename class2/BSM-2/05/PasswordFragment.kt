package com.example.myapp01.ui.main

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys
import com.example.myapp01.MainApplication
import com.example.myapp01.R
import com.example.myapp01.databinding.Fragment2Binding
import com.example.myapp01.databinding.MainFragmentBinding
import com.example.myapp01.databinding.PasswordfragmentBinding

class PasswordFragment: Fragment() {

private var binding: PasswordfragmentBinding? = null
// zmiana hasła

override fun onCreateView(
    inflater: LayoutInflater, container: ViewGroup?,
    savedInstanceState: Bundle?
): View {
    val fragmentBinding = PasswordfragmentBinding.inflate(inflater, container, false)
    binding = fragmentBinding
    return fragmentBinding.root
}

override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    binding?.apply {
        lifecycleOwner = viewLifecycleOwner
        //viewModel = sharedViewModel
        fragment = this@PasswordFragment
    }
}
    fun EditText.StringValue()= text.toString()
    fun new_pass(){
        val context = MainApplication.applicationContext()
        var sharedPreferences = context.getSharedPreferences("PasswordU", Context.MODE_PRIVATE)

        val editor: SharedPreferences.Editor = sharedPreferences.edit()


        editor.putString("PasswordU", binding!!.editTextTextPassword2.StringValue()).apply()
        // usuwa domyślne hasło
        editor.remove("Password").apply()

        findNavController().navigate(R.id.action_passwordFragment_to_fragment2)
    }
}