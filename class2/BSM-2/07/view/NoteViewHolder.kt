package com.mkielar.notepadbsm.view

import androidx.recyclerview.widget.RecyclerView
import com.mkielar.notepadbsm.databinding.MenuItemBinding

class NoteViewHolder(
    private val binding: MenuItemBinding
) : RecyclerView.ViewHolder(binding.root) {

    fun bind(index: String, title: String, function: (String) -> Unit) {
        binding.index.text = index
        binding.title.text = title
        binding.root.setOnClickListener {
            function(title)
        }
    }
}