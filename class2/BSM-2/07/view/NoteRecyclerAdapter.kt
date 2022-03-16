package com.mkielar.notepadbsm.view

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.mkielar.notepadbsm.databinding.MenuItemBinding

class NoteRecyclerAdapter(
    private val notes: List<String>,
    private val callback: (String) -> Unit
) : RecyclerView.Adapter<NoteViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoteViewHolder =
        NoteViewHolder(MenuItemBinding.inflate(LayoutInflater.from(parent.context), parent, false))

    override fun onBindViewHolder(holder: NoteViewHolder, position: Int) {
        holder.bind("${position  + 1}.", notes[position], callback)
    }

    override fun getItemCount(): Int {
        return notes.size
    }

}